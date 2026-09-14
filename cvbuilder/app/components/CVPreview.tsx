'use client'

import React from 'react'
import { Education, Experience, Hobby, Language, PersonalDetails, Project, Skill, CVTemplate } from '@/type'
import { templates } from './cv-templates'

interface Props {
  personalDetails: PersonalDetails
  file: File | null
  theme: string
  template: CVTemplate
  experiences: Experience[]
  educations: Education[]
  languages: Language[]
  skills: Skill[]
  hobbies: Hobby[]
  projects: Project[]
  download?: boolean
  ref?: React.Ref<HTMLDivElement>
}

export default React.memo(function CVPreview({
  template,
  theme,
  ...props
}: Props) {
  const TemplateComponent = templates[template] || templates.classic;

  return (
    <div data-theme={theme}>
      <TemplateComponent {...props} />
    </div>
  );
});