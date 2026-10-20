export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT =
  "CVFast — Créez un CV professionnel en quelques minutes";

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
          top: -60,
          left: 700,
          width: 600,
          height: 600,
          borderRadius: 9999,
          background: "#dcecff",
          opacity: 0.85,
          display: "flex",
        }}
      />

      {/* Marque */}
      <div
        style={{
          position: "absolute",
          top: 46,
          left: 64,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            borderRadius: 11,
            background: "#60a5fa",
            color: "#ffffff",
            fontSize: 19,
            fontWeight: 800,
          }}
        >
          CV
        </div>
        <div style={{ display: "flex", alignItems: "center", marginLeft: 12 }}>
          <div style={{ display: "flex", fontSize: 23, fontWeight: 800, color: "#09090b" }}>
            CVFast
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 23,
              fontWeight: 800,
              color: "#60a5fa",
              marginLeft: 7,
            }}
          >
            Builder
          </div>
        </div>
      </div>

      {/* Bloc texte (hero simplifié) */}
      <div
        style={{
          position: "absolute",
          top: 118,
          left: 64,
          width: 660,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -2,
              color: "#09090b",
            }}
          >
            Votre CV,
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -2,
              color: "#09090b",
              marginTop: 6,
            }}
          >
            prêt en
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: -2,
              color: "#60a5fa",
              marginTop: 6,
            }}
          >
            10 minutes.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 25,
            lineHeight: 1.4,
            color: "#52525b",
            width: 610,
          }}
        >
          Choisissez un modèle et exportez un CV professionnel optimisé ATS.
          Gratuit, sans inscription.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            height: 64,
            padding: "0 30px",
            borderRadius: 18,
            background: "#60a5fa",
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 700,
            marginTop: 32,
          }}
        >
          Créer mon CV
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: 9999,
              background: "rgba(255,255,255,0.22)",
              marginLeft: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderTop: "2.5px solid #ffffff",
                borderRight: "2.5px solid #ffffff",
                transform: "rotate(45deg)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Téléphone (aperçu de CV) */}
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 70,
          width: 300,
          height: 490,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 300,
            height: 480,
            background: "#0d0d0f",
            borderRadius: 44,
            padding: 12,
            boxShadow: "0 40px 90px -30px rgba(15,23,42,0.6)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              background: "#fff8f1",
              borderRadius: 34,
              padding: 24,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignSelf: "center",
                width: 64,
                height: 8,
                borderRadius: 9999,
                background: "#d4d4d8",
                marginBottom: 20,
              }}
            />

            {/* En-tête du CV */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  width: 54,
                  height: 54,
                  borderRadius: 9999,
                  background: "#e2e8f0",
                  border: "2px solid #bfdbfe",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", marginLeft: 14 }}>
                <div
                  style={{
                    display: "flex",
                    width: 116,
                    height: 12,
                    borderRadius: 6,
                    background: "#09090b",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    width: 82,
                    height: 9,
                    borderRadius: 5,
                    background: "#60a5fa",
                    marginTop: 9,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                height: 2,
                background: "#eadfd2",
                marginTop: 18,
                marginBottom: 4,
              }}
            />

            {/* Sections du CV */}
            {[0, 1, 2].map((section) => (
              <div
                key={section}
                style={{ display: "flex", flexDirection: "column", marginTop: 18 }}
              >
                <div
                  style={{
                    display: "flex",
                    width: 92,
                    height: 11,
                    borderRadius: 5,
                    background: "#60a5fa",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    width: "94%",
                    height: 9,
                    borderRadius: 4,
                    background: "#e4e0da",
                    marginTop: 12,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    width: "80%",
                    height: 9,
                    borderRadius: 4,
                    background: "#e4e0da",
                    marginTop: 9,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    width: "62%",
                    height: 9,
                    borderRadius: 4,
                    background: "#e4e0da",
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
