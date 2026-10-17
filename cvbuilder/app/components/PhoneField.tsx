"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";
import "flag-icons/css/flag-icons.min.css";
import { AlertCircle, Check, ChevronDown, Search } from "lucide-react";

const DEFAULT_COUNTRY: CountryCode = "CG";

type Country = { code: CountryCode; name: string; dial: string };

const regionNames =
  typeof Intl !== "undefined" && typeof Intl.DisplayNames !== "undefined"
    ? new Intl.DisplayNames(["fr"], { type: "region" })
    : null;

const COUNTRIES: Country[] = getCountries()
  .map((code) => ({
    code,
    name: regionNames?.of(code) ?? code,
    dial: getCountryCallingCode(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "fr"));

const COUNTRY_BY_CODE = new Map<CountryCode, Country>(
  COUNTRIES.map((c) => [c.code, c]),
);

type Props = {
  value: string;
  onChange: (value: string) => void;
  inputId?: string;
};

const PhoneField: React.FC<Props> = ({ value, onChange, inputId }) => {
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [display, setDisplay] = useState("");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [touched, setTouched] = useState(false);
  const [highlight, setHighlight] = useState(0);

  // Les noms de pays via Intl.DisplayNames diffèrent entre Node (SSR) et le
  // navigateur : on ne les rend qu'après le montage pour éviter les écarts
  // d'hydratation. Avant montage, on affiche le code ISO (identique partout).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const lastEmitted = useRef<string>("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Synchronise l'affichage quand la valeur change depuis l'extérieur (init, reset…)
  useEffect(() => {
    if (value === lastEmitted.current) return;
    if (!value) {
      setDisplay("");
      return;
    }
    const trimmed = value.trim();
    if (trimmed.startsWith("+")) {
      const parsed = parsePhoneNumberFromString(trimmed);
      if (parsed) {
        if (parsed.country) setCountry(parsed.country);
        setDisplay(parsed.nationalNumber);
        lastEmitted.current = parsed.number;
        return;
      }
    }
    setDisplay(trimmed.replace(/\D/g, ""));
  }, [value]);

  const selected = COUNTRY_BY_CODE.get(country);
  const countryLabel = (c?: Country) => (c ? (mounted ? c.name : c.code) : "");

  const digits = display.replace(/\D/g, "");
  const e164 = digits ? `+${getCountryCallingCode(country)}${digits}` : "";
  const valid = digits.length > 0 && isValidPhoneNumber(e164);
  const plausible = digits.length > 0 && isPossiblePhoneNumber(e164);
  const invalid = digits.length > 0 && !valid && (touched || plausible);

  const emit = (nextCountry: CountryCode, nextDigits: string) => {
    const next = nextDigits
      ? `+${getCountryCallingCode(nextCountry)}${nextDigits}`
      : "";
    lastEmitted.current = next;
    onChange(next);
  };

  const handleNumberChange = (raw: string) => {
    const nextDigits = raw.replace(/\D/g, "");
    setDisplay(new AsYouType(country).input(nextDigits));
    emit(country, nextDigits);
  };

  const pickCountry = (code: CountryCode) => {
    setCountry(code);
    setDisplay(digits ? new AsYouType(code).input(digits) : "");
    emit(code, digits);
    setOpen(false);
    setQuery("");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q.replace("+", "")) ||
        c.code.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => setHighlight(0), [query, open]);

  // Fermeture au clic extérieur
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => searchRef.current?.focus());
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const c = filtered[highlight];
      if (c) pickCountry(c.code);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  const statusId = inputId ? `${inputId}-status` : undefined;

  return (
    <div className="flex flex-col gap-1.5" ref={rootRef}>
      <div className="join w-full">
        <button
          type="button"
          className="btn join-item h-12 min-h-0 gap-1.5 border-base-300 bg-base-100 px-3 font-normal normal-case text-base-content"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Changer de pays — ${countryLabel(selected)} (+${selected?.dial ?? ""})`}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`fi fi-${country.toLowerCase()} rounded-sm`}
            aria-hidden="true"
          />
          <span className="text-sm font-medium">+{selected?.dial}</span>
          <ChevronDown className="size-4 opacity-50" />
        </button>

        <input
          id={inputId}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="06 00 00 00"
          value={display}
          onChange={(e) => handleNumberChange(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={invalid}
          aria-describedby={statusId}
          className={`input input-bordered join-item h-12 w-full min-w-0 border-base-300 cv-cream-field ${
            valid ? "border-success" : invalid ? "border-error" : ""
          }`}
        />
      </div>

      {open && (
        <div
          className="rounded-xl border border-base-300 bg-base-100 shadow-sm"
          onKeyDown={onKeyDown}
        >
          <div className="flex items-center gap-2 border-b border-base-300 px-3 py-2">
            <Search className="size-4 shrink-0 text-base-content/40" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Rechercher un pays ou un indicatif…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Rechercher un pays"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <ul
            role="listbox"
            aria-label="Liste des pays"
            className="max-h-64 overflow-y-auto py-1"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-base-content/50">
                Aucun résultat
              </li>
            )}
            {filtered.map((c, i) => (
              <li key={c.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={c.code === country}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => pickCountry(c.code)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                    i === highlight ? "bg-base-200" : "hover:bg-base-200/60"
                  }`}
                >
                  <span
                    className={`fi fi-${c.code.toLowerCase()} rounded-sm`}
                    aria-hidden="true"
                  />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="tabular-nums text-base-content/50">
                    +{c.dial}
                  </span>
                  {c.code === country && (
                    <Check className="size-4 text-primary" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {valid && (
        <span
          id={statusId}
          className="flex items-center gap-1 text-xs text-success"
        >
          <Check className="size-3.5" aria-hidden="true" />
          Numéro valide
        </span>
      )}

      {invalid && (
        <span
          id={statusId}
          className="flex items-center gap-1 text-xs text-error"
        >
          <AlertCircle className="size-3.5" aria-hidden="true" />
          Numéro invalide pour {countryLabel(selected)} (+{selected?.dial}).
        </span>
      )}
    </div>
  );
};

export default PhoneField;
