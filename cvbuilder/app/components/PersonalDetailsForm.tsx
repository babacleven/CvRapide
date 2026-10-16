import { PersonalDetails } from '@/type';
import React from 'react'

type Props = {
  personalDetails: PersonalDetails;
  setPersonalDetails: (pd: PersonalDetails) => void;
  setFile: (file: File | null) => void;
}

const labelClass = 'text-[11px] font-semibold uppercase tracking-wide text-base-content/50';

const PersonalDetailsForm: React.FC<Props> = ({ personalDetails, setPersonalDetails, setFile }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fied: keyof PersonalDetails) => {
    setPersonalDetails({ ...personalDetails, [fied]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <label className='flex flex-col gap-1.5'>
        <span className={labelClass}>Nom complet</span>
        <input
          type="text"
          placeholder='ex : Awa Mbemba'
          value={personalDetails.fullName}
          onChange={(e) => handleChange(e, 'fullName')}
          className='input input-bordered cv-cream-field w-full'
        />
      </label>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <label className='flex flex-col gap-1.5'>
          <span className={labelClass}>Email</span>
          <input
            type="email"
            placeholder='vous@exemple.com'
            value={personalDetails.email}
            onChange={(e) => handleChange(e, 'email')}
            className='input input-bordered cv-cream-field w-full'
          />
        </label>
        <label className='flex flex-col gap-1.5'>
          <span className={labelClass}>Téléphone</span>
          <input
            type="tel"
            placeholder='+242 06 00 00 00'
            value={personalDetails.phone}
            onChange={(e) => handleChange(e, 'phone')}
            className='input input-bordered cv-cream-field w-full'
          />
        </label>
      </div>

      <label className='flex flex-col gap-1.5'>
        <span className={labelClass}>Ville / Pays</span>
        <input
          type="text"
          placeholder='ex : Brazzaville, Congo'
          value={personalDetails.address}
          onChange={(e) => handleChange(e, 'address')}
          className='input input-bordered cv-cream-field w-full'
        />
      </label>

      <label className='flex flex-col gap-1.5'>
        <span className={labelClass}>Titre du poste visé</span>
        <input
          type="text"
          placeholder='ex : Développeur web junior'
          value={personalDetails.postSeeking}
          onChange={(e) => handleChange(e, 'postSeeking')}
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
          className='textarea textarea-bordered cv-cream-field w-full'
        ></textarea>
      </label>

      <div className='flex flex-col gap-1.5'>
        <span className={labelClass}>Réseaux & portfolio</span>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
          <input
            type="text"
            placeholder='github.com/…'
            aria-label='GitHub'
            value={personalDetails.github ?? ''}
            onChange={(e) => handleChange(e, 'github')}
            className='input input-bordered w-full'
          />
          <input
            type="text"
            placeholder='linkedin.com/in/…'
            aria-label='LinkedIn'
            value={personalDetails.linkedin ?? ''}
            onChange={(e) => handleChange(e, 'linkedin')}
            className='input input-bordered w-full'
          />
          <input
            type="text"
            placeholder='votre-portfolio.com'
            aria-label='Portfolio'
            value={personalDetails.portfolio ?? ''}
            onChange={(e) => handleChange(e, 'portfolio')}
            className='input input-bordered w-full'
          />
        </div>
      </div>

      <label className='flex flex-col gap-1.5'>
        <span className={labelClass}>Photo de profil</span>
        <input
          type="file"
          accept='image/*'
          onChange={handleFileChange}
          className='file-input file-input-bordered file-input-primary w-full'
        />
      </label>
    </div>
  )
}

export default PersonalDetailsForm
