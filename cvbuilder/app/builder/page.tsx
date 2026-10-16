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
  FolderGit2,
} from "lucide-react";
import PersonalDetailsForm from "@/app/components/PersonalDetailsForm";
import ProjectForm from "@/app/components/ProjectForm";
import { useEffect, useRef, useState } from "react";
import "./builder.css";
import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Project,
  Skill,
  CVTemplate,
} from "@/type";
import {
  educationsPreset,
  experiencesPreset,
  hobbiesPreset,
  languagesPreset,
  personalDetailsPreset,
  projectsPreset,
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

type SectionCardProps = {
  title: string;
  icon: React.ElementType;
  onReset: () => void;
  children: React.ReactNode;
};

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon: Icon,
  onReset,
  children,
}) => (
  <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5">
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <button
        type="button"
        onClick={onReset}
        title="Réinitialiser"
        aria-label={`Réinitialiser : ${title}`}
        className="btn btn-ghost btn-xs btn-circle"
      >
        <RotateCw className="size-4 text-base-content/50" />
      </button>
    </div>
    {children}
  </div>
);

type MobileAccordionItemProps = {
  title: string;
  icon: React.ElementType;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  onReset?: () => void;
};

const MobileAccordionItem: React.FC<MobileAccordionItemProps> = ({
  title,
  icon: Icon,
  open,
  onToggle,
  children,
  onReset,
}) => (
  <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
    <div className="flex items-center justify-between px-4 py-3.5">
      <button
        onClick={onToggle}
        className="flex flex-1 items-center gap-3 text-left"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
        <span className="text-sm font-semibold">{title}</span>
      </button>
      <div className="flex items-center gap-1">
        {onReset && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
            className="btn btn-ghost btn-xs btn-circle"
            title="Réinitialiser"
          >
            <RotateCw className="size-4 text-base-content/50" />
          </button>
        )}
        <button
          onClick={onToggle}
          aria-label={open ? "Fermer la section" : "Ouvrir la section"}
          className="btn btn-ghost btn-xs btn-circle"
        >
          <ChevronDown
            className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
    {open && <div className="border-t border-base-300 p-4">{children}</div>}
  </div>
);

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
  const [projects, setProjects] = useLocalStorage<Project[]>(
    "projects",
    projectsPreset,
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
  const handleResetProjects = () => setProjects([]);

  const cvPreviewRef = useRef<HTMLDivElement>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);
  const mobilePreviewScaleRef = useRef<HTMLDivElement>(null);

  const isIOS =
    typeof navigator !== "undefined" &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

  const waitForElementReady = async (
    element: HTMLElement,
  ): Promise<boolean> => {
    const deadline = Date.now() + 5000;
    const hasValidSize = () => {
      const rect = element.getBoundingClientRect();
      const w = element.scrollWidth || rect.width;
      const h = element.scrollHeight || rect.height;
      return w > 0 && h > 0;
    };
    while (!hasValidSize() && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 30));
    }
    if (!hasValidSize()) return false;

    try {
      if (document.fonts && typeof document.fonts.ready?.then === "function") {
        await Promise.race([
          document.fonts.ready,
          new Promise((r) => setTimeout(r, 3000)),
        ]);
      }
    } catch {
      // Les erreurs de polices ne doivent pas bloquer la génération
    }

    const images = Array.from(element.querySelectorAll("img"));
    for (const img of images) {
      const isLoaded = () => img.complete && img.naturalWidth > 0;
      let waited = 0;
      while (!isLoaded() && waited < 5000) {
        await new Promise((r) => setTimeout(r, 50));
        waited += 50;
      }
    }

    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r)),
    );
    return true;
  };

  const getSafeScale = (width: number, height: number): number => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const base = isMobile ? 1.5 : 2;
    const maxDim = 4096;
    const maxPixels = 16_000_000;
    const scale = Math.min(
      base,
      maxDim / Math.max(width, height),
      maxPixels / Math.max(1, width * height),
    );
    return Math.max(0.5, Math.min(scale, 3));
  };

  const generatePdfBlob = async (element: HTMLElement): Promise<Blob> => {
    const width = element.scrollWidth || 950;
    const height = element.scrollHeight || 1300;
    const scale = getSafeScale(width, height);
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
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

    return pdf.output("blob");
  };

  const savePdfBlob = async (
    blob: Blob,
    fileName: string,
  ): Promise<"saved" | "cancelled"> => {
    if (
      isIOS &&
      typeof navigator.share === "function" &&
      typeof navigator.canShare === "function"
    ) {
      const file = new File([blob], fileName, { type: "application/pdf" });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: "Mon CV",
            text: "Voici mon CV",
          });
          return "saved";
        } catch (error) {
          const name = (error as DOMException)?.name;
          if (name === "AbortError") return "cancelled";
          console.warn(
            "Partage iOS impossible, bascule sur le téléchargement direct :",
            error,
          );
        }
      }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    return "saved";
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 9999,
    });
  };

  const handleDownloadPdf = async () => {
    if (downloading) return;
    const element = cvPreviewRef.current;
    if (!element) return;
    setDownloading(true);
    await new Promise((r) => requestAnimationFrame(r));
    const wrapper = pdfContainerRef.current
      ?.firstElementChild as HTMLElement | null;
    const prevZoom = wrapper?.style.zoom;
    if (wrapper) wrapper.style.zoom = "1";
    try {
      const ready = await waitForElementReady(element);
      if (!ready) throw new Error("L'aperçu du CV n'est pas prêt.");
      const blob = await generatePdfBlob(element);
      const fileName = `cv-${personalDetails.fullName || "sans-nom"}.pdf`;
      const result = await savePdfBlob(blob, fileName);
      if (result === "saved") {
        fireConfetti();
        const modal = document.getElementById("pdf_modal") as HTMLDialogElement;
        if (modal) modal.close();
      }
    } catch (error) {
      console.error("Erreur lors de la generation du PDF :", error);
      const msg = error instanceof Error ? error.message : String(error);
      alert(
        `Impossible de générer le PDF : ${msg}. Essayez de réduire la longueur du CV ou de réessayer.`,
      );
    } finally {
      if (wrapper) wrapper.style.zoom = prevZoom || String(dialogZoom);
      setDownloading(false);
    }
  };

  const handleDirectDownload = async () => {
    if (downloading) return;
    const element = mobilePreviewRef.current;
    if (!element) return;
    setDownloading(true);
    await new Promise((r) => requestAnimationFrame(r));
    const scaleDiv = mobilePreviewScaleRef.current;
    const prevTransform = scaleDiv?.style.transform;
    if (scaleDiv) scaleDiv.style.transform = "translateX(-50%)";
    try {
      const ready = await waitForElementReady(element);
      if (!ready) throw new Error("L'aperçu du CV n'est pas prêt.");
      const blob = await generatePdfBlob(element);
      const fileName = `cv-${personalDetails.fullName || "sans-nom"}.pdf`;
      const result = await savePdfBlob(blob, fileName);
      if (result === "saved") fireConfetti();
    } catch (error) {
      console.error("Erreur lors de la generation du PDF :", error);
      const msg = error instanceof Error ? error.message : String(error);
      alert(
        `Impossible de générer le PDF : ${msg}. Essayez de réduire la longueur du CV ou de réessayer.`,
      );
    } finally {
      if (scaleDiv) {
        scaleDiv.style.transform =
          prevTransform || `translateX(-50%) scale(${zoom / 100})`;
      }
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

  const TEMPLATE_OPTIONS: { value: CVTemplate; label: string }[] = [
    { value: "classic", label: "Classique" },
    { value: "modern", label: "Moderne" },
    { value: "minimal", label: "Minimaliste" },
    { value: "bold", label: "Audacieux" },
    { value: "profile", label: "Profil" },
    { value: "skills", label: "Compétences" },
  ];

  // Carte de section (desktop) — présentation uniquement
  const MobileHeader = () => (
    <div className="lg:hidden fixed inset-x-0 top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold italic tracking-tight">
          CVFast<span className="text-primary"> Builder</span>
        </h1>
        <div className="flex items-center gap-1 rounded-full bg-base-200 p-1">
          <button
            onClick={() => setActiveTab("edit")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "edit"
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/60"
            }`}
          >
            Éditer
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "preview"
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content/60"
            }`}
          >
            <Eye className="size-3.5" />
            Aperçu
          </button>
        </div>
      </div>
    </div>
  );

  const MobileEditView = () => (
    <div className="lg:hidden h-[100dvh] space-y-3 overflow-y-auto px-4 pb-24 pt-[76px]">
      <div className="flex gap-2">
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value as CVTemplate)}
          className="select select-bordered select-sm min-w-0 flex-1"
        >
          {TEMPLATE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="select select-bordered select-sm min-w-0 flex-1"
        >
          {themes.map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName}
            </option>
          ))}
        </select>
        <button onClick={openPdfModal} className="btn btn-primary btn-sm">
          <Download className="size-4" />
        </button>
      </div>

      <MobileAccordionItem
        title="Informations personnelles"
        icon={User}
        open={openSection === "personal"}
        onToggle={() => toggleSection("personal")}
        onReset={handleResetPersonalDetails}
      >
        <PersonalDetailsForm
          personalDetails={personalDetails}
          setPersonalDetails={setPersonalDetails}
          setFile={handleSetFile}
        />
      </MobileAccordionItem>

      <MobileAccordionItem
        title="Expériences professionnelles"
        icon={Briefcase}
        open={openSection === "experiences"}
        onToggle={() => toggleSection("experiences")}
        onReset={handleResetExperiences}
      >
        <ExperienceForm
          experience={experiences}
          setExperiences={setExperience}
        />
      </MobileAccordionItem>

      <MobileAccordionItem
        title="Formations"
        icon={GraduationCap}
        open={openSection === "educations"}
        onToggle={() => toggleSection("educations")}
        onReset={handleResetEducations}
      >
        <EducationForm educations={educations} setEducations={setEducations} />
      </MobileAccordionItem>

      <MobileAccordionItem
        title="Langues"
        icon={Globe}
        open={openSection === "languages"}
        onToggle={() => toggleSection("languages")}
        onReset={handleResetLanguages}
      >
        <LanguageForm languages={languages} setLanguages={setLanguages} />
      </MobileAccordionItem>

      <MobileAccordionItem
        title="Projets réalisés"
        icon={FolderGit2}
        open={openSection === "projects"}
        onToggle={() => toggleSection("projects")}
        onReset={handleResetProjects}
      >
        <ProjectForm projects={projects} setProjects={setProjects} />
      </MobileAccordionItem>

      <MobileAccordionItem
        title="Compétences"
        icon={Star}
        open={openSection === "skills"}
        onToggle={() => toggleSection("skills")}
        onReset={handleResetSkills}
      >
        <SkillForm skills={skills} setSkills={setSkills} />
      </MobileAccordionItem>

      <MobileAccordionItem
        title="Loisirs"
        icon={Target}
        open={openSection === "hobbies"}
        onToggle={() => toggleSection("hobbies")}
        onReset={handleResetHobbies}
      >
        <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
      </MobileAccordionItem>
    </div>
  );

  const MobilePreviewView = () => (
    <div className="lg:hidden flex h-[100dvh] flex-col px-3 pb-4 pt-[76px]">
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div className="flex items-center justify-between border-b border-base-300 px-4 py-3">
          <h2 className="text-sm font-semibold">Prévisualisation</h2>
          <div className="flex items-center gap-1 rounded-full bg-base-200 p-1">
            <button
              onClick={() => setZoom(Math.max(25, zoom - 10))}
              aria-label="Zoom arrière"
              className="grid size-7 place-items-center rounded-full transition-colors hover:bg-base-300"
            >
              <ZoomOut className="size-3.5" />
            </button>
            <span className="w-10 text-center text-xs font-mono tabular-nums">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(Math.min(100, zoom + 10))}
              aria-label="Zoom avant"
              className="grid size-7 place-items-center rounded-full transition-colors hover:bg-base-300"
            >
              <ZoomIn className="size-3.5" />
            </button>
          </div>
        </div>
        <div className="cv-preview-bg relative flex-1 overflow-auto bg-base-200">
          <div
            ref={mobilePreviewScaleRef}
            className="absolute left-1/2 top-0"
            style={{
              transform: `translateX(-50%) scale(${zoom / 100})`,
              transformOrigin: "top center",
              width: "950px",
            }}
          >
            <CVPreview
              ref={mobilePreviewRef}
              personalDetails={personalDetails}
              file={file}
              theme={theme}
              template={template}
              experiences={experiences}
              educations={educations}
              languages={languages}
              hobbies={hobbies}
              skills={skills}
              projects={projects}
            />
          </div>
        </div>
        <div className="border-t border-base-300 p-3">
          <button
            onClick={handleDirectDownload}
            className="btn btn-primary w-full"
            disabled={downloading}
          >
            {downloading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            {downloading ? "Téléchargement..." : "Télécharger mon CV"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="cv-builder min-h-screen bg-base-200 text-base-content"
      data-theme="cvfastlight"
    >
      {!isDesktop && (
        <div>
          {MobileHeader()}
          {activeTab === "edit" ? MobileEditView() : MobilePreviewView()}
        </div>
      )}

      {isDesktop && (
        <section className="flex h-screen overflow-hidden">
          {/* Panneau formulaire */}
          <aside className="flex h-full w-2/5 flex-col border-r border-base-300 bg-base-200 xl:w-1/3">
            <header className="flex items-center justify-between border-b border-base-300 bg-base-100/70 px-6 py-4 backdrop-blur">
              <h1 className="text-xl font-bold italic tracking-tight">
                CVFast<span className="text-primary"> Builder</span>
              </h1>
              <button className="btn btn-primary btn-sm" onClick={openPdfModal}>
                Prévisualiser
                <Eye className="size-4" />
              </button>
            </header>

            <div className="scrollable no-scrollbar flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-base-content/50">
                      Modèle
                    </span>
                    <select
                      value={template}
                      onChange={(e) =>
                        setTemplate(e.target.value as CVTemplate)
                      }
                      className="select select-bordered select-sm w-full"
                    >
                      {TEMPLATE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-base-content/50">
                      Thème
                    </span>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="select select-bordered select-sm w-full"
                    >
                      {themes.map((themeName) => (
                        <option key={themeName} value={themeName}>
                          {themeName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <SectionCard
                  title="Qui êtes-vous ?"
                  icon={User}
                  onReset={handleResetPersonalDetails}
                >
                  <PersonalDetailsForm
                    personalDetails={personalDetails}
                    setPersonalDetails={setPersonalDetails}
                    setFile={handleSetFile}
                  />
                </SectionCard>

                <SectionCard
                  title="Expériences"
                  icon={Briefcase}
                  onReset={handleResetExperiences}
                >
                  <ExperienceForm
                    experience={experiences}
                    setExperiences={setExperience}
                  />
                </SectionCard>

                <SectionCard
                  title="Formations"
                  icon={GraduationCap}
                  onReset={handleResetEducations}
                >
                  <EducationForm
                    educations={educations}
                    setEducations={setEducations}
                  />
                </SectionCard>

                <SectionCard
                  title="Langues"
                  icon={Globe}
                  onReset={handleResetLanguages}
                >
                  <LanguageForm
                    languages={languages}
                    setLanguages={setLanguages}
                  />
                </SectionCard>

                <SectionCard
                  title="Projets réalisés"
                  icon={FolderGit2}
                  onReset={handleResetProjects}
                >
                  <ProjectForm projects={projects} setProjects={setProjects} />
                </SectionCard>

                <SectionCard
                  title="Compétences"
                  icon={Star}
                  onReset={handleResetSkills}
                >
                  <SkillForm skills={skills} setSkills={setSkills} />
                </SectionCard>

                <SectionCard
                  title="Loisirs"
                  icon={Target}
                  onReset={handleResetHobbies}
                >
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </SectionCard>
              </div>
            </div>
          </aside>

          {/* Panneau aperçu */}
          <div className="scrollable-preview cv-preview-bg relative h-full w-3/5 bg-[#fff8f1] xl:w-2/3">
            <div className="fixed right-5 top-5 z-40 flex items-center gap-3 rounded-full border border-base-300 bg-base-100/90 px-4 py-2 shadow-sm backdrop-blur">
              <input
                type="range"
                min={50}
                max={200}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="range range-xs range-primary"
              />
              <p className="w-10 text-right text-sm font-semibold tabular-nums text-primary">
                {zoom}%
              </p>
            </div>
            <div
              className="flex items-center justify-center p-10"
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
                projects={projects}
              />
            </div>
          </div>
        </section>
      )}

      <dialog id="pdf_modal" className="modal">
        <div className="modal-box w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <form method="dialog">
            <button
              aria-label="Fermer"
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
            >
              ✕
            </button>
          </form>
          <div className="mt-4">
            <div className="mb-5 flex flex-wrap items-center justify-end gap-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDialogZoom(Math.max(0.2, dialogZoom - 0.1))}
                  className="btn btn-ghost btn-sm btn-circle"
                  title="Zoom arrière"
                >
                  <ZoomOut className="size-4" />
                </button>
                <span className="w-10 text-center text-xs font-mono tabular-nums">
                  {Math.round(dialogZoom * 100)}%
                </span>
                <button
                  onClick={() => setDialogZoom(Math.min(1.5, dialogZoom + 0.1))}
                  className="btn btn-ghost btn-sm btn-circle"
                  title="Zoom avant"
                >
                  <ZoomIn className="size-4" />
                </button>
              </div>
              <button
                onClick={handleDownloadPdf}
                className="btn btn-primary"
                disabled={downloading}
              >
                {downloading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                {downloading ? "Téléchargement..." : "Télécharger"}
              </button>
            </div>
            {pdfModalOpened && (
              <div
                ref={pdfContainerRef}
                className="w-full max-w-full overflow-auto"
              >
                <div className="mx-auto" style={{ zoom: dialogZoom, width: 950 }}>
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
                    projects={projects}
                    download={true}
                    ref={cvPreviewRef}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </dialog>

      {downloading && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-base-100/95 backdrop-blur-sm"
        >
          <Loader2 className="size-10 animate-spin text-primary" />
          <p className="text-base font-semibold">Génération du CV en cours...</p>
        </div>
      )}
    </div>
  );
}
