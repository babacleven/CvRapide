export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT =
  "CVFast — Créez un CV professionnel en quelques minutes";

const FEATURES = ["PDF & DOCX", "Optimisé ATS", "Gratuit"];

export function OgCard() {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#fff8f1",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Halo lumineux derrière le téléphone */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: 40,
          width: 620,
          height: 620,
          borderRadius: 9999,
          background: "#e0efff",
          opacity: 0.75,
          display: "flex",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "56px 64px",
        }}
      >
        {/* Colonne texte (hero) */}
        <div style={{ display: "flex", flexDirection: "column", width: 620 }}>
          {/* Marque */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "#60a5fa",
                color: "#ffffff",
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              CV
            </div>
            <div style={{ display: "flex", alignItems: "center", marginLeft: 12 }}>
              <div style={{ display: "flex", fontSize: 24, fontWeight: 800, color: "#09090b" }}>
                CVFast
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#60a5fa",
                  marginLeft: 7,
                }}
              >
                Builder
              </div>
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              marginTop: 18,
              padding: "9px 16px",
              borderRadius: 9999,
              background: "rgba(22,163,74,0.10)",
              border: "1px solid rgba(22,163,74,0.22)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 9,
                height: 9,
                borderRadius: 9999,
                background: "#16a34a",
                marginRight: 9,
              }}
            />
            <div style={{ display: "flex", fontSize: 16, fontWeight: 600, color: "#16a34a" }}>
              Le créateur de CV moderne
            </div>
          </div>

          {/* Titre */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 22 }}>
            <div
              style={{
                display: "flex",
                fontSize: 70,
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: -2,
                color: "#09090b",
              }}
            >
              Votre CV,
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", marginTop: 8 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 70,
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: -2,
                  color: "#09090b",
                }}
              >
                prêt en
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 70,
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: -2,
                  color: "#60a5fa",
                  marginLeft: 18,
                }}
              >
                10 minutes.
              </div>
            </div>
          </div>

          {/* Sous-titre */}
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 20,
              lineHeight: 1.45,
              color: "#52525b",
              width: 560,
            }}
          >
            Choisissez un modèle, renseignez vos informations et exportez un CV
            professionnel, optimisé ATS. Sans inscription, gratuit, sans filigrane.
          </div>

          {/* Boutons */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 56,
                padding: "0 24px",
                borderRadius: 16,
                background: "#60a5fa",
                color: "#ffffff",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Créer mon CV
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 9999,
                  background: "rgba(255,255,255,0.22)",
                  marginLeft: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 7,
                    height: 7,
                    borderTop: "2px solid #ffffff",
                    borderRight: "2px solid #ffffff",
                    transform: "rotate(45deg)",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 56,
                padding: "0 24px",
                borderRadius: 16,
                background: "#09090b",
                color: "#ffffff",
                fontSize: 18,
                fontWeight: 600,
                marginLeft: 14,
              }}
            >
              Voir les modèles
            </div>
          </div>

          {/* Ligne de fonctionnalités */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 24 }}>
            <div
              style={{
                display: "flex",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                color: "#a1a1aa",
                marginRight: 16,
              }}
            >
              DISPONIBLE
            </div>
            {FEATURES.map((label) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", marginRight: 16 }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 7,
                    height: 7,
                    borderRadius: 9999,
                    background: "#16a34a",
                    marginRight: 6,
                  }}
                />
                <div style={{ display: "flex", fontSize: 14, fontWeight: 500, color: "#52525b" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Téléphone (aperçu de CV) */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 360,
            height: 518,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Anneau décoratif */}
          <div
            style={{
              position: "absolute",
              width: 460,
              height: 460,
              borderRadius: 9999,
              background: "#bfdbfe",
              opacity: 0.4,
              display: "flex",
            }}
          />

          {/* Châssis */}
          <div
            style={{
              position: "relative",
              display: "flex",
              width: 286,
              height: 490,
              background: "#0d0d0f",
              borderRadius: 42,
              padding: 12,
              boxShadow: "0 40px 90px -30px rgba(15,23,42,0.55)",
            }}
          >
            {/* Écran */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                background: "#fff8f1",
                borderRadius: 32,
                padding: 22,
                overflow: "hidden",
              }}
            >
              {/* Encoche */}
              <div
                style={{
                  display: "flex",
                  alignSelf: "center",
                  width: 66,
                  height: 7,
                  borderRadius: 9999,
                  background: "#d4d4d8",
                  marginBottom: 16,
                }}
              />

              {/* En-tête du CV */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    width: 48,
                    height: 48,
                    borderRadius: 9999,
                    background: "#e2e8f0",
                    border: "2px solid #bfdbfe",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 108,
                      height: 10,
                      borderRadius: 5,
                      background: "#09090b",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      width: 74,
                      height: 8,
                      borderRadius: 4,
                      background: "#60a5fa",
                      marginTop: 8,
                    }}
                  />
                </div>
              </div>

              {/* Sections du CV */}
              {[0, 1, 2, 3].map((section) => (
                <div
                  key={section}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 84,
                      height: 9,
                      borderRadius: 5,
                      background: "#60a5fa",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      width: "92%",
                      height: 8,
                      borderRadius: 4,
                      background: "#e2e0dc",
                      marginTop: 12,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      width: "78%",
                      height: 8,
                      borderRadius: 4,
                      background: "#e2e0dc",
                      marginTop: 8,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      width: "60%",
                      height: 8,
                      borderRadius: 4,
                      background: "#e2e0dc",
                      marginTop: 8,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Badge flottant : CV exporté */}
          <div
            style={{
              position: "absolute",
              top: 56,
              left: -22,
              display: "flex",
              alignItems: "center",
              padding: 12,
              borderRadius: 16,
              background: "#ffffff",
              border: "1px solid rgba(9,9,11,0.06)",
              boxShadow: "0 20px 40px -14px rgba(9,9,11,0.28)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: 9999,
                background: "#16a34a",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 10,
                  height: 5,
                  borderLeft: "2px solid #ffffff",
                  borderBottom: "2px solid #ffffff",
                  transform: "rotate(-45deg)",
                  marginTop: -2,
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
              <div style={{ display: "flex", fontSize: 14, fontWeight: 700, color: "#09090b" }}>
                CV exporté
              </div>
              <div style={{ display: "flex", fontSize: 11, color: "#a1a1aa", marginTop: 2 }}>
                cv-aristote-baba.pdf
              </div>
            </div>
          </div>

          {/* Badge flottant : ATS */}
          <div
            style={{
              position: "absolute",
              bottom: 74,
              right: -18,
              display: "flex",
              alignItems: "center",
              padding: 12,
              borderRadius: 16,
              background: "#ffffff",
              border: "1px solid rgba(9,9,11,0.06)",
              boxShadow: "0 20px 40px -14px rgba(9,9,11,0.28)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 34,
                height: 32,
                borderRadius: 8,
                background: "#eff6ff",
                color: "#3b82f6",
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              ATS
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
              <div style={{ display: "flex", fontSize: 14, fontWeight: 700, color: "#09090b" }}>
                Optimisé ATS
              </div>
              <div style={{ display: "flex", fontSize: 11, color: "#a1a1aa", marginTop: 2 }}>
                Lisibles par les robots
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
