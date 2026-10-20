export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT =
  "CVFast — Créez un CV professionnel en quelques minutes";

const BADGES = ["Gratuit", "Sans compte", "PDF & DOCX"];

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
      {/* Halos décoratifs */}
      <div
        style={{
          position: "absolute",
          top: -150,
          right: -110,
          width: 460,
          height: 460,
          borderRadius: 9999,
          background: "#dbeafe",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -170,
          left: -90,
          width: 380,
          height: 380,
          borderRadius: 9999,
          background: "#eff6ff",
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
          padding: 72,
        }}
      >
        {/* Colonne texte */}
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
          {/* Marque */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "#2563eb",
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              CV
            </div>
            <div style={{ display: "flex", alignItems: "center", marginLeft: 16 }}>
              <div style={{ display: "flex", fontSize: 34, fontWeight: 800, color: "#0f172a" }}>
                CVFast
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 34,
                  fontWeight: 800,
                  color: "#2563eb",
                  marginLeft: 10,
                }}
              >
                Builder
              </div>
            </div>
          </div>

          {/* Titre */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 36 }}>
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#0f172a",
              }}
            >
              Créez un CV professionnel
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#0f172a",
                marginTop: 8,
              }}
            >
              en quelques minutes.
            </div>
          </div>

          {/* Sous-titre */}
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 25,
              lineHeight: 1.4,
              color: "#475569",
            }}
          >
            Modèles modernes et optimisés ATS. Export en PDF ou DOCX, gratuit et
            sans compte.
          </div>

          {/* Badges */}
          <div style={{ display: "flex", marginTop: 40 }}>
            {BADGES.map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  marginRight: 12,
                  borderRadius: 9999,
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  color: "#0f172a",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 10,
                    height: 10,
                    borderRadius: 9999,
                    background: "#2563eb",
                    marginRight: 10,
                  }}
                />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Aperçu de CV */}
        <div
          style={{
            display: "flex",
            width: 380,
            height: 470,
            background: "#ffffff",
            borderRadius: 24,
            border: "1px solid #e2e8f0",
            padding: 30,
            boxShadow: "0 40px 80px -30px rgba(15,23,42,0.35)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
          >
            {/* En-tête du CV */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  width: 72,
                  height: 72,
                  borderRadius: 9999,
                  background: "#eff6ff",
                  border: "3px solid #bfdbfe",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 18,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 170,
                    height: 14,
                    borderRadius: 7,
                    background: "#0f172a",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    width: 120,
                    height: 11,
                    borderRadius: 6,
                    background: "#93c5fd",
                    marginTop: 10,
                  }}
                />
              </div>
            </div>

            {/* Sections */}
            {[0, 1, 2].map((section) => (
              <div
                key={section}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 26,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 96,
                    height: 10,
                    borderRadius: 5,
                    background: "#2563eb",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    width: "92%",
                    height: 9,
                    borderRadius: 5,
                    background: "#e2e8f0",
                    marginTop: 14,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    width: "80%",
                    height: 9,
                    borderRadius: 5,
                    background: "#e2e8f0",
                    marginTop: 9,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    width: "64%",
                    height: 9,
                    borderRadius: 5,
                    background: "#e2e8f0",
                    marginTop: 9,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
