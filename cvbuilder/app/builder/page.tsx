"use client";
import {
  Eye,
  RotateCw,
  Save,
  ChevronDown,
  Download,
  ZoomIn,
  ZoomOut,
  Loader2,
  User,
  Briefcase,
  GraduationCap,
  Globe,
  Star,
  Target,
} from "lucide-react";
import PersonalDetailsForm from "@/app/components/PersonalDetailsForm";
import { useEffect, useRef, useState } from "react";
import "./builder.css";
import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
  CVTemplate,
} from "@/type";
import {
  educationsPreset,
  experiencesPreset,
  hobbiesPreset,
  languagesPreset,
  personalDetailsPreset,
  skillsPreset,
} from "@/presets";
import CVPreview from "@/app/components/CVPreview";
import ExperienceForm from "@/app/components/ExperienceForm";
import EducationForm from "@/app/components/EducationForm";
import LanguageForm from "@/app/components/LanguageForm";
import SkillForm from "@/app/components/SkillForm";
import HobbyForm from "@/app/components/HobbyForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti";

// Hook personnalisé pour localStorage
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default function Home() {
  // Tous les states sont maintenant persistant dans localStorage
  const [personalDetails, setPersonalDetails] =
    useLocalStorage<PersonalDetails>("personalDetails", personalDetailsPreset);
  const [experiences, setExperience] = useLocalStorage<Experience[]>(
    "experiences",
    experiencesPreset,
  );
  const [educations, setEducations] = useLocalStorage<Education[]>(
    "educations",
    educationsPreset,
  );
  const [languages, setLanguages] = useLocalStorage<Language[]>(
    "languages",
    languagesPreset,
  );
  const [skills, setSkills] = useLocalStorage<Skill[]>("skills", skillsPreset);
  const [hobbies, setHobbies] = useLocalStorage<Hobby[]>(
    "hobbies",
    hobbiesPreset,
  );
  const [theme, setTheme] = useLocalStorage<string>("theme", "cupcake");
  const [template, setTemplate] = useLocalStorage<CVTemplate>(
    "template",
    "classic",
  );
  const [zoom, setZoom] = useLocalStorage<number>("zoom", 77);

  useEffect(() => {
    if (
      zoom === 77 &&
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      setZoom(35);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gestion de la photo (fichier) : stockage en base64
  const [file, setFile] = useState<File | null>(null);
  const [photoBase64, setPhotoBase64] = useLocalStorage<string | null>(
    "photoBase64",
    null,
  );

  // Charger la photo à partir du base64 stocké
  useEffect(() => {
    if (photoBase64) {
      fetch(photoBase64)
        .then((res) => res.blob())
        .then((blob) => {
          const fileFromStorage = new File([blob], "profile.png", {
            type: blob.type,
          });
          setFile(fileFromStorage);
        })
        .catch(() => setFile(null));
    } else {
      // Photo par défaut si aucune sauvegarde
      const defaultImageUrl = "/profile.png";
      fetch(defaultImageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const defaultFile = new File([blob], "profile.png", {
            type: blob.type,
          });
          setFile(defaultFile);
        });
    }
  }, [photoBase64]);

  // Sauvegarder la photo en base64 quand elle change
  const handleSetFile = (newFile: File | null) => {
    setFile(newFile);
    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string);
      };
      reader.readAsDataURL(newFile);
    } else {
      setPhotoBase64(null);
    }
  };

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [openSection, setOpenSection] = useState<string | null>("personal");
  const [dialogZoom, setDialogZoom] = useState<number>(1);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [pdfModalOpened, setPdfModalOpened] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.title = "CVFast Builder - Créez votre CV";
  }, []);

  useEffect(() => {
    const onResize = () => {
      const modal = document.getElementById("pdf_modal") as HTMLDialogElement;
      if (modal?.open) fitPdfPreview();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!pdfModalOpened) return;
    const modal = document.getElementById("pdf_modal") as HTMLDialogElement;
    if (modal?.open) {
      requestAnimationFrame(() => requestAnimationFrame(fitPdfPreview));
    }
  }, [pdfModalOpened]);

  const themes = [
    "cvfast",
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const handleResetPersonalDetails = () =>
    setPersonalDetails({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      photoUrl: "",
      postSeeking: "",
      description: "",
    });

  const handleResetExperiences = () => setExperience([]);
  const handleResetEducations = () => setEducations([]);
  const handleResetLanguages = () => setLanguages([]);
  const handleResetSkills = () => setSkills([]);
  const handleResetHobbies = () => setHobbies([]);

  const cvPreviewRef = useRef<HTMLDivElement>(null);
  const hiddenCaptureRef = useRef<HTMLDivElement>(null);

  const generateAndSavePdf = async (element: HTMLElement) => {
    try {
      const width = element.scrollWidth || 950;
      const height = element.scrollHeight || 1300;
      const maxDim = 4096;
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const scale = Math.min(
        isMobile ? 1.5 : 2,
        maxDim / Math.max(width, height),
      );
      const canvas = await html2canvas(element, {
        scale,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.92);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "A4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

      const fileName = `cv-${personalDetails.fullName || "sans-nom"}.pdf`;
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 9999,
      });
    } catch (error) {
      console.error("Erreur lors de la generation du PDF :", error);
      const msg =
        error instanceof Error ? error.message : String(error);
      alert(
        `Impossible de générer le PDF : ${msg}. Essayez de réduire la longueur du CV ou de réessayer.`,
      );
    }
  };

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current;
    if (!element) return;
    const wrapper = pdfContainerRef.current
      ?.firstElementChild as HTMLElement | null;
    const prevZoom = wrapper?.style.zoom;
    if (wrapper) wrapper.style.zoom = "1";
    setDownloading(true);
    try {
      await generateAndSavePdf(element);
    } finally {
      if (wrapper && prevZoom) wrapper.style.zoom = prevZoom;
      setDownloading(false);
    }
    const modal = document.getElementById("pdf_modal") as HTMLDialogElement;
    if (modal) modal.close();
  };

  const handleDirectDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      let element = hiddenCaptureRef.current;
      for (let i = 0; i < 40 && !element; i++) {
        await new Promise((resolve) => setTimeout(resolve, 25));
        element = hiddenCaptureRef.current;
      }
      if (element) await generateAndSavePdf(element);
    } finally {
      setDownloading(false);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const fitPdfPreview = () => {
    const container = pdfContainerRef.current;
    const modal = document.getElementById("pdf_modal") as HTMLDialogElement;
    if (!container) return;
    const availW = container.clientWidth - 40;
    const box = modal?.querySelector(".modal-box") as HTMLElement | null;
    const availH = box ? box.clientHeight - 120 : availW;
    const scaleByW = availW / 950;
    const scaleByH = availH > 0 ? availH / 1300 : scaleByW;
    const scale = Math.max(0.2, Math.min(1, scaleByW, scaleByH));
    setDialogZoom(Math.round(scale * 100) / 100);
  };

  const openPdfModal = () => {
    setPdfModalOpened(true);
    const modal = document.getElementById("pdf_modal") as HTMLDialogElement;
    if (!modal) return;
    modal.showModal();
    requestAnimationFrame(fitPdfPreview);
  };

  const MobileHeader = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-base-200 border-b border-base-300 px-4 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold italic">
          CVFast<span className="text-primary"> Builder</span>
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("edit")}
            className={`btn btn-sm ${activeTab === "edit" ? "btn-primary" : "btn-ghost"}`}
          >
            Editer
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`btn btn-sm ${activeTab === "preview" ? "btn-primary" : "btn-ghost"}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const MobileAccordionItem = ({
    title,
    icon: Icon,
    sectionKey,
    children,
    onReset,
  }: {
    title: string;
    icon: React.ElementType;
    sectionKey: string;
    children: React.ReactNode;
    onReset?: () => void;
  }) => (
    <div className="bg-base-100 rounded-xl overflow-hidden shadow-sm border border-base-300 mb-3">
      <div className="w-full px-4 py-4 flex items-center justify-between bg-gradient-to-r from-base-100 to-base-200">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center gap-3 flex-1 text-left"
        >
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold">{title}</span>
        </button>
        <div className="flex items-center gap-3">
          {onReset && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="p-2 hover:bg-base-300 rounded-full transition-colors"
              title="Réinitialiser"
            >
              <RotateCw className="w-5 h-5 text-base-content/60" />
            </button>
          )}
          <button onClick={() => toggleSection(sectionKey)}>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${openSection === sectionKey ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
      {openSection === sectionKey && (
        <div className="p-4 border-t border-base-300">{children}</div>
      )}
    </div>
  );

  const MobileEditView = () => (
    <div className="lg:hidden pt-20 pb-6 px-4 space-y-4 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="flex gap-2 mb-4 flex-wrap">
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value as CVTemplate)}
          className="select select-bordered select-sm flex-1 min-w-[120px]"
        >
          <option value="classic">Classique</option>
          <option value="modern">Moderne</option>
          <option value="minimal">Minimaliste</option>
          <option value="bold">Audacieux</option>
          <option value="profile">Profil</option>
          <option value="skills">Compétences</option>
        </select>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="select select-bordered select-sm flex-1 min-w-[120px]"
        >
          {themes.map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName}
            </option>
          ))}
        </select>
        <button
          onClick={openPdfModal}
          className="btn btn-primary btn-sm"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {MobileAccordionItem({
        title: "Informations personnelles",
        icon: User,
        sectionKey: "personal",
        onReset: handleResetPersonalDetails,
        children: (
          <PersonalDetailsForm
            personalDetails={personalDetails}
            setPersonalDetails={setPersonalDetails}
            setFile={handleSetFile}
          />
        ),
      })}

      {MobileAccordionItem({
        title: "Experiences professionnelles",
        icon: Briefcase,
        sectionKey: "experiences",
        onReset: handleResetExperiences,
        children: (
          <ExperienceForm
            experience={experiences}
            setExperiences={setExperience}
          />
        ),
      })}

      {MobileAccordionItem({
        title: "Formations",
        icon: GraduationCap,
        sectionKey: "educations",
        onReset: handleResetEducations,
        children: (
          <EducationForm
            educations={educations}
            setEducations={setEducations}
          />
        ),
      })}

      {MobileAccordionItem({
        title: "Langues",
        icon: Globe,
        sectionKey: "languages",
        onReset: handleResetLanguages,
        children: (
          <LanguageForm languages={languages} setLanguages={setLanguages} />
        ),
      })}

      <div className="space-y-3">
        {MobileAccordionItem({
          title: "Competences",
          icon: Star,
          sectionKey: "skills",
          onReset: handleResetSkills,
          children: <SkillForm skills={skills} setSkills={setSkills} />,
        })}
        {MobileAccordionItem({
          title: "Loisirs",
          icon: Target,
          sectionKey: "hobbies",
          onReset: handleResetHobbies,
          children: <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />,
        })}
      </div>
    </div>
  );

  const MobilePreviewView = () => (
    <div className="lg:hidden pt-20 pb-6 px-2 h-[calc(100vh-80px)] flex flex-col">
      <div className="bg-base-100 rounded-xl p-3 shadow-lg flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-base">Previsualisation</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom(Math.max(25, zoom - 10))}
              className="btn btn-ghost btn-xs btn-circle"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-xs font-mono w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(100, zoom + 10))}
              className="btn btn-ghost btn-xs btn-circle"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-base-200 rounded-lg relative">
          <div
            className="absolute left-1/2 top-0"
            style={{
              transform: `translateX(-50%) scale(${zoom / 100})`,
              transformOrigin: "top center",
              width: "950px",
            }}
          >
            <CVPreview
              personalDetails={personalDetails}
              file={file}
              theme={theme}
              template={template}
              experiences={experiences}
              educations={educations}
              languages={languages}
              hobbies={hobbies}
              skills={skills}
            />
          </div>
        </div>
        <button
          onClick={handleDirectDownload}
          className="btn btn-primary w-full mt-3"
          disabled={downloading}
        >
          {downloading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {downloading ? "Téléchargement..." : "Telecharger mon CV"}
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {!isDesktop && (
        <div>
          {MobileHeader()}
          {activeTab === "edit" ? MobileEditView() : MobilePreviewView()}
        </div>
      )}

      {isDesktop && (
        <div>
          <section className="flex items-center h-screen">
          <div className="lg:w-2/5 xl:w-1/3 h-full p-6 lg:p-10 bg-base-200 scrollable no-scrollbar overflow-y-auto">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold italic">
                CVFast<span className="text-primary"> Builder</span>
              </h1>
              <button
                className="btn btn-primary"
                onClick={openPdfModal}
              >
                Previsualiser
                <Eye className="w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-6 rounded-lg">
              <div className="flex gap-2 mb-2">
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as CVTemplate)}
                  className="select select-bordered select-sm flex-1"
                >
                  <option value="classic">Classique</option>
                  <option value="modern">Moderne</option>
                  <option value="minimal">Minimaliste</option>
                  <option value="bold">Audacieux</option>
                  <option value="profile">Profil</option>
                  <option value="skills">Compétences</option>
                </select>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="select select-bordered select-sm flex-1"
                >
                  {themes.map((themeName) => (
                    <option key={themeName} value={themeName}>
                      {themeName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">
                  Qui etes-vous ?
                </h1>
                <button
                  onClick={handleResetPersonalDetails}
                  className="btn btn-primary btn-sm"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>
              <PersonalDetailsForm
                personalDetails={personalDetails}
                setPersonalDetails={setPersonalDetails}
                setFile={handleSetFile}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">
                  Experiences
                </h1>
                <button
                  onClick={handleResetExperiences}
                  className="btn btn-primary btn-sm"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>
              <ExperienceForm
                experience={experiences}
                setExperiences={setExperience}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">
                  Educations
                </h1>
                <button
                  onClick={handleResetEducations}
                  className="btn btn-primary btn-sm"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>
              <EducationForm
                educations={educations}
                setEducations={setEducations}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Langues</h1>
                <button
                  onClick={handleResetLanguages}
                  className="btn btn-primary btn-sm"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>
              <LanguageForm languages={languages} setLanguages={setLanguages} />

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="badge badge-primary badge-outline">
                      Competences
                    </h1>
                    <button
                      onClick={handleResetSkills}
                      className="btn btn-primary btn-sm"
                    >
                      <RotateCw className="w-5 h-5" />
                    </button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="badge badge-primary badge-outline">
                      Loisirs
                    </h1>
                    <button
                      onClick={handleResetHobbies}
                      className="btn btn-primary btn-sm"
                    >
                      <RotateCw className="w-5 h-5" />
                    </button>
                  </div>
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 xl:w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative">
            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5">
              <input
                type="range"
                min={50}
                max={200}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="range range-xs range-primary"
              />
              <p className="ml-4 text-sm text-primary">{zoom}%</p>
            </div>
            <div
              className="flex justify-center items-center"
              style={{ transform: `scale(${zoom / 200})` }}
            >
              <CVPreview
                personalDetails={personalDetails}
                file={file}
                theme={theme}
                template={template}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobbies}
                skills={skills}
              />
            </div>
          </div>
        </section>
        </div>
      )}

      <dialog id="pdf_modal" className="modal">
          <div className="modal-box w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                X
              </button>
            </form>
            <div className="mt-5">
              <div className="flex flex-wrap justify-end mb-5 items-center gap-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setDialogZoom(Math.max(0.2, dialogZoom - 0.1))
                    }
                    className="btn btn-ghost btn-sm btn-circle"
                    title="Zoom arrière"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono w-10 text-center">
                    {Math.round(dialogZoom * 100)}%
                  </span>
                  <button
                    onClick={() =>
                      setDialogZoom(Math.min(1.5, dialogZoom + 0.1))
                    }
                    className="btn btn-ghost btn-sm btn-circle"
                    title="Zoom avant"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleDownloadPdf}
                  className="btn btn-primary"
                  disabled={downloading}
                >
                  {downloading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4" />
                  )}
                  {downloading ? "Téléchargement..." : "Telecharger"}
                </button>
              </div>
              {pdfModalOpened && (
                <div
                  ref={pdfContainerRef}
                  className="w-full max-w-full overflow-auto"
                >
                <div
                  className="mx-auto"
                  style={{
                    zoom: dialogZoom,
                    width: 950,
                  }}
                >
                  <CVPreview
                    personalDetails={personalDetails}
                    file={file}
                    theme={theme}
                    template={template}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobbies}
                    skills={skills}
                    download={true}
                    ref={cvPreviewRef}
                  />
                  </div>
                </div>
              )}
            </div>
          </div>
        </dialog>

      {downloading && activeTab === "preview" && (
        <div
          aria-hidden
          className="fixed inset-0 z-[9999]"
          style={{ pointerEvents: "none" }}
        >
          <div className="absolute top-0 left-0" style={{ width: 950 }}>
            <CVPreview
              ref={hiddenCaptureRef}
              personalDetails={personalDetails}
              file={file}
              theme={theme}
              template={template}
              experiences={experiences}
              educations={educations}
              languages={languages}
              hobbies={hobbies}
              skills={skills}
              download={true}
            />
          </div>
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="font-semibold ml-3">
              Téléchargement du CV en cours...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
