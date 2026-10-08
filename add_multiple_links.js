const fs = require('fs');

const path = 'app/components/Projectcard.jsx';
let content = fs.readFileSync(path, 'utf8');

// Update props
content = content.replace(
  'const ProjectCard = ({ id, title, imageSrc, images, description, link, buttonText, type, status }) => {',
  'const ProjectCard = ({ id, title, imageSrc, images, description, link, buttonText, type, status, multipleLinks }) => {'
);

// We need to import Figma icon just in case
if (!content.includes('FaFigma')) {
    content = content.replace(
      'import { FaTimes, FaChevronLeft, FaChevronRight, FaGithub, FaGlobe } from "react-icons/fa";',
      'import { FaTimes, FaChevronLeft, FaChevronRight, FaGithub, FaGlobe, FaFigma } from "react-icons/fa";'
    );
}

// Update Modal Footer Actions
const oldFooter = `{/* Modal Footer Actions */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap gap-4 shrink-0 justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700 transition"
              >
                {language === 'th' ? 'ปิด' : 'Close'}
              </button>
              <Link
                href={link || '#'}
                target={isExternal ? "_blank" : "_self"} 
                className={\`flex items-center gap-2 px-6 py-2.5 rounded-xl transition font-semibold text-sm shadow-sm \${
                  type === 'github' 
                    ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }\`}
              >
                {type === 'github' && <FaGithub className="text-[16px]" />}
                {type === 'website' && <FaGlobe className="text-[16px]" />}
                <span>{buttonText}</span>
              </Link>
            </div>`;

const newFooter = `{/* Modal Footer Actions */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap gap-4 shrink-0 justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700 transition mr-auto"
              >
                {language === 'th' ? 'ปิด' : 'Close'}
              </button>
              
              {multipleLinks && multipleLinks.length > 0 ? (
                multipleLinks.map((ml, idx) => (
                  <Link
                    key={idx}
                    href={ml.url || '#'}
                    target={ml.url.startsWith("http") ? "_blank" : "_self"} 
                    className={\`flex items-center gap-2 px-6 py-2.5 rounded-xl transition font-semibold text-sm shadow-sm \${
                      ml.type === 'github' 
                        ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
                        : ml.type === 'figma'
                          ? 'bg-[#F24E1E] hover:bg-[#F24E1E]/90 text-white'
                          : 'bg-teal-600 hover:bg-teal-700 text-white'
                    }\`}
                  >
                    {ml.type === 'github' && <FaGithub className="text-[16px]" />}
                    {ml.type === 'figma' && <FaFigma className="text-[16px]" />}
                    {ml.type === 'website' && <FaGlobe className="text-[16px]" />}
                    <span>{language === 'th' ? (ml.labelTh || ml.labelEn) : (ml.labelEn || ml.labelTh)}</span>
                  </Link>
                ))
              ) : (
                <Link
                  href={link || '#'}
                  target={isExternal ? "_blank" : "_self"} 
                  className={\`flex items-center gap-2 px-6 py-2.5 rounded-xl transition font-semibold text-sm shadow-sm \${
                    type === 'github' 
                      ? 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }\`}
                >
                  {type === 'github' && <FaGithub className="text-[16px]" />}
                  {type === 'website' && <FaGlobe className="text-[16px]" />}
                  <span>{buttonText}</span>
                </Link>
              )}
            </div>`;

content = content.replace(oldFooter, newFooter);

fs.writeFileSync(path, content);
console.log("Updated Projectcard.jsx for multiple links");
