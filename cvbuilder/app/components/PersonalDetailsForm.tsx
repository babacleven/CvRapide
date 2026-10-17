import { PersonalDetails } from '@/type';
import React from 'react';
import { Github, Globe, Linkedin } from 'lucide-react';
import PhoneField from './PhoneField';

type Props = {
  personalDetails: PersonalDetails;
  setPersonalDetails: (pd: PersonalDetails) => void;
  setFile: (file: File | null) => void;
};

const labelClass =
  'text-[11px] font-semibold uppercase tracking-wide text-base-content/50';

type SocialField = {
  key: keyof PersonalDetails;
  label: string;
  Icon: React.ElementType;
  placeholder: string;
  hint: string;
};

const SOCIAL_FIELDS: SocialField[] = [
  {
    key: 'github',
    label: 'GitHub',
    Icon: Github,
    placeholder: 'github.com/…',
    hint: 'Lien vers votre profil GitHub',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    Icon: Linkedin,
    placeholder: 'linkedin.com/in/…',
    hint: 'Lien vers votre profil LinkedIn',
  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    Icon: Globe,
    placeholder: 'votre-portfolio.com',
    hint: 'Votre site personnel ou portfolio',
  },
];

const PersonalDetailsForm: React.FC<Props> = ({
  personalDetails,
  setPersonalDetails,
  setFile,
}) => {
  const setField = (key: keyof PersonalDetails, value: string) =>
    setPersonalDetails({ ...personalDetails, [key]: value });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof PersonalDetails,
  ) => setField(field, e.target.value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Identité */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <label className='flex flex-col gap-1.5'>
          <span className={labelClass}>Nom complet</span>
          <input
            type='text'
            autoComplete='name'
            placeholder='ex : Awa Mbemba'
            value={personalDetails.fullName}
            onChange={(e) => handleChange(e, 'fullName')}
            className='input input-bordered cv-cream-field w-full'
          />
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className={labelClass}>Titre professionnel</span>
          <input
            type='text'
            placeholder='ex : Développeur web junior'
            value={personalDetails.postSeeking}
            onChange={(e) => handleChange(e, 'postSeeking')}
            className='input input-bordered cv-cream-field w-full'
          />
        </label>
      </div>

      {/* Coordonnées */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <label className='flex flex-col gap-1.5'>
          <span className={labelClass}>Adresse e-mail</span>
          <input
            type='email'
            autoComplete='email'
            placeholder='vous@exemple.com'
            value={personalDetails.email}
            onChange={(e) => handleChange(e, 'email')}
            className='input input-bordered cv-cream-field w-full'
          />
        </label>

        <div className='flex flex-col gap-1.5'>
          <label htmlFor='pd-phone' className={labelClass}>
            Téléphone
          </label>
          <PhoneField
            inputId='pd-phone'
            value={personalDetails.phone}
            onChange={(v) => setField('phone', v)}
          />
        </div>
      </div>

      <label className='flex flex-col gap-1.5'>
        <span className={labelClass}>Ville et pays</span>
        <input
          type='text'
          autoComplete='address-level2'
          placeholder='ex : Brazzaville, Congo'
          value={personalDetails.address}
          onChange={(e) => handleChange(e, 'address')}
          className='input input-bordered cv-cream-field w-full'
        />
      </label>

      <label className='flex flex-col gap-1.5'>
        <span className={labelClass}>À propos</span>
        <textarea
          rows={4}
          placeholder='Résumez votre parcours, vos compétences clés et votre objectif professionnel en quelques lignes.'
          value={personalDetails.description}
          onChange={(e) => handleChange(e, 'description')}
          className='textarea textarea-bordered cv-cream-field w-full leading-relaxed'
        ></textarea>
      </label>

      <label className='flex flex-col gap-1.5'>
        <span className={labelClass}>Photo de profil</span>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='file-input file-input-bordered file-input-primary w-full'
        />
        <span className='text-[11px] text-base-content/40'>
          Format carré conseillé (JPG ou PNG).
        </span>
      </label>

      {/* Réseaux sociaux & portfolio */}
      <div className='flex flex-col gap-3 border-t border-base-300 pt-5'>
        <div className='flex flex-col gap-0.5'>
          <span className='text-sm font-semibold text-base-content'>
            Réseaux sociaux et portfolio
          </span>
          <span className='text-[11px] text-base-content/50'>
            Tous les liens sont facultatifs. Ajoutez seulement ceux que vous
            souhaitez voir sur votre CV.
          </span>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {SOCIAL_FIELDS.map(({ key, label, Icon, placeholder, hint }) => (
            <label key={key} className='flex flex-col gap-1.5'>
              <span className='flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-base-content/50'>
                <Icon className='size-3.5' aria-hidden='true' />
                {label}
              </span>
              <input
                type='url'
                inputMode='url'
                placeholder={placeholder}
                value={(personalDetails[key] as string | undefined) ?? ''}
                onChange={(e) => handleChange(e, key)}
                className='input input-bordered w-full'
              />
              <span className='text-[11px] text-base-content/40'>{hint}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
