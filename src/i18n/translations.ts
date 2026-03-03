export const translations = {
    sv: {
        nav: {
            links: [
                { label: 'Om', href: '#om' },
                { label: 'Projekt', href: '#projekt' },
                { label: 'Utbildning', href: '#utbildning' },
                { label: 'Erfarenhet', href: '#erfarenhet' },
                { label: 'Kompetenser', href: '#kompetenser' },
                { label: 'Kontakt', href: '#kontakt' },
            ],
            openMenu: 'Öppna meny',
            closeMenu: 'Stäng meny',
            themeLight: 'Byt till ljust tema',
            themeDark: 'Byt till mörkt tema',
        },
        hero: {
            greeting: 'Hej, jag är',
            name: 'Edwin Lundbäck',
            role: 'Fullstackutvecklare & Ingenjörsstudent',
            description: 'Med bakgrund inom elitidrott och teknik drivs jag av struktur, ansvar och att bygga lösningar som håller i längden.',
            cta: 'Se projekt',
            contact: 'Ta kontakt',
            scroll: 'Scrolla ned',
        },
        projects: {
            heading: 'Projekt',
            subheading: 'Utvalda arbeten',
            viewCode: 'GitHub',
            viewLive: 'Live',
            viewReport: 'Rapport',
            close: 'Stäng',
            items: [
                {
                    id: 1,
                    title: 'Portfolio',
                    tags: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Vercel'],
                    summary: 'Den fantastiska sida du befinner dig på just nu. Utvecklad med inspiration från min bakgrund inom alpint och min syn på hur en webbplats bör upplevas',
                    description: 'Den här sidan är ett personligt portfolio byggt från grunden med React, Vite, TypeScript och Tailwind — och representerar mig som person. Designat med Old Money-inspirerade färger och typsnitt: Cormorant Garamond, djupa marinblå toner och sandbeige accenter. Slalomtemat som löper genom sidan speglar en stor del av vem jag är utanför koden.',
                    images: [
                        '/project1_2.svg',
                        '/project1_1.svg',

                    ],
                    github: 'https://github.com/edlu2100/Portfolio',
                    live: '',
                },
                {
                    id: 2,
                    title: 'Mobilapp',
                    tags: ['React Native', 'Expo', 'Nativewind'],
                    summary: 'En app som snart är helt klar och kan presenteras.',
                    description: 'En app som snart kommer kunna visas upp. Ett stort projekt som pågått sedan september 2025',
                    images: [
                        '/project2_1.svg',
                    ],
                    blurImage: true,
                    github: '',
                    live: '',
                }, {
                    id: 3,
                    title: 'Automatiserad webbplatsövervakning',
                    tags: ['Laravel', 'Inertia', 'Vue', 'Tailwind', 'MySQL'],
                    summary: 'Internt administrationsverktyg som skannar webbplatser och larmar vid brutna länkar, DNS-problem och utgående SSL.',
                    description:
                        'Jag utvecklade ett internt administrationsgränssnitt som kontinuerligt övervakar ett stort antal webbplatser. Systemet skannar samtliga länkar och loggar statuskoder, kontrollerar DNS (A-records och name servers) samt bevakar SSL-certifikatens giltighet och utgångsdatum. Vid avvikelser skickas notifieringar via e-post och Slack.\n\n' +
                        'Fokus låg på robust backend-logik, tydlig felrapportering och ett enkelt UI för att lägga till/hantera webbplatser samt välja vilka tester som ska köras. Eventuella fel meddelas via slack och mail.',
                    images: [
                        '/project4_1.svg'
                    ],
                    github: 'https://github.com/edlu2100/ex-jobb/',
                    live: '',
                    reportUrl: 'https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1878583&dswid=-1400',
                },
                {
                    id: 4,
                    title: 'I-Portalen',
                    tags: ['React', 'Strapi', 'Chakra UI'],
                    summary: 'Underhåller och vidareutvecklar I-portalen.',
                    description: 'Beskriv ditt tredje projekt här. Vad var utmaningen, hur löste du den och vad blev resultatet? Byt ut detta mot riktigt innehåll.',
                    images: [
                        '/project3_1.svg'
                    ],
                    github: '',
                    live: 'https://i-portalen.se/',
                },
            ],
        }, experience: {
            heading: 'Erfarenhet',
            subheading: 'Karriär',
            items: [
                {
                    year: 'Apr 2025 – Nuvarande',
                    role: 'Systemutvecklare',
                    company: 'Skymaker AB',
                    description: 'Utvecklade plattformsfunktioner och prototyper för en SaaS-produkt, omsatte kundkrav till tekniska lösningar och fick praktisk erfarenhet av produktionssystem samt hur tekniska beslut påverkar både produkt och affär.',
                    tags: ['TypeScript', 'Dynamaker'],
                },
                {
                    year: 'Nov 2025 – Dec 2025',
                    role: 'Shopify-utvecklare & e-handelskonsult',
                    company: 'Frilans',
                    description: 'Byggde och lanserade en skräddarsydd Shopify-butik för BigLenz med fokus på design och struktur.',
                    tags: ['Shopify', 'JavaScript', 'CSS'],
                },
                {
                    year: 'Mar 2024 – Nuvarande',
                    role: 'Ledamot, Teknologrådet',
                    company: 'Sveriges Ingenjörer',
                    description: 'Förtroendevald representant teknologrådet, där jag företräder ingenjörsstudenters perspektiv lokalt och internationellt, bland annat genom deltagande vid European Youth Event (EYE) i Malta och ingenjörsfullmäktige (FUM).',
                    tags: [],
                },
                {
                    year: 'Nov 2024 – Nuvarande',
                    role: 'Samordnare för studentambassadörer',
                    company: 'Sveriges Ingenjörer',
                    description: 'Leder och utvecklar studentambassadörsverksamheten på campus, med ansvar för ett team om fem personer och bidragande till rekordresultat i medlemsrekrytering med en konverteringsgrad på 72%.',
                    tags: [],
                },
                {
                    year: 'Jan 2025 – Jun 2025',
                    role: 'Ekonomiassistent',
                    company: 'Solann AB',
                    description: 'Ansvarade för löpande bokföring, fakturering och finansiella avstämningar i en professionell redovisningsmiljö. Arbetade nära VD och ekonomichef och fick insikt i bolagsstyrning och hur finansiella beslut påverkar verksamheten som helhet.',
                    tags: ['Odoo'],
                },
                {
                    year: '2024 – 2026',
                    role: 'Ordförande & Vice Ordförande, Webgroup',
                    company: 'Linköpings universitet',
                    description: 'Ledde och utvecklade den ideela utskottet Webgroup med ansvar för projektfördelning, teknisk riktning och struktur. Arbetade med att förbättra arbetsprocesser och samarbete inom gruppen.',
                    tags: ['Ledarskap', 'Projektledning'],
                },
                {
                    year: 'Jun 2021 – Aug 2024',
                    role: 'Processoperatör',
                    company: 'LKAB',
                    description: 'Övervakade och optimerade processer för att säkerställa stabil drift, effektivitet och höga säkerhetskrav. Arbetade i miljöer med stort ansvar där noggrannhet, disciplin och kontinuerlig riskmedvetenhet var avgörande.',
                    tags: [],
                },
                {
                    year: '2019 – 2024',
                    role: 'Elitsatsande alpin skidåkare',
                    company: 'Team Bauhaus, Svenska Skidförbundet',
                    description: 'Tävlande på nationell elitnivå samtidigt som jag kombinerade idrottssatsningen med akademiska studier. Verkade i en prestationsmiljö med fokus på långsiktig utveckling, struktur och resultat.',
                    tags: ['Hög prestation', "Disciplin"],
                },
            ],
        },
        education: {
            heading: 'Utbildning',
            subheading: 'Akademisk bakgrund',
            items: [
                {
                    year: '2024 – 2029',
                    degree: 'Civilingenjör, Industriell ekonomi',
                    school: 'Linköpings Universitet, Sverige',
                    description: 'Studier inom teknik, ekonomi och ledarskap med fokus på strategi, systemförståelse och affärsutveckling. Parallellt har jag varit engagerad i utskottet Webgroup där jag suttit som både vice ordförande och ordförande med ansvar för struktur, projektledning och teknisk utveckling.',
                    tags: [],
                },
                {
                    year: '2021 – 2024',
                    degree: 'Högskoleexamen, Datateknik',
                    school: 'Mittuniversitetet, Sverige',
                    description: 'Utbildning inom webbutveckling med fokus på både frontend och backend. Studierna kombinerades med elitidrott på skiduniversitet samt tävling på nationell nivå som en del av Team Bauhaus, vilket utvecklade disciplin, struktur och prestationsförmåga.',
                    tags: [],
                },
            ],
        },
        skills: {
            heading: 'Kompetenser',
            subheading: 'Teknisk profil',
            languages: 'Språk',
            technologies: 'Teknologier',
            items: {
                languages: ['TypeScript', 'JavaScript', 'PHP', 'C#', '.Net', 'CSS', 'HTML', 'SQL'],
                technologies: ['React.js', 'React Native', 'Vue.js', 'jQuery', 'Laravel', 'ASP.NET', 'Node.js', 'WordPress', 'Dynamaker', 'Tailwind', 'Excel'],
            },
        },
        contact: {
            heading: 'Kontakt',
            subheading: 'Hör av dig',
            nameLabel: 'Namn',
            namePlaceholder: 'Ditt namn',
            emailLabel: 'E-post',
            emailPlaceholder: 'din@epost.se',
            messageLabel: 'Meddelande',
            messagePlaceholder: 'Vad kan jag hjälpa dig med?',
            send: 'Skicka meddelande',
            sending: 'Skickar…',
            successTitle: 'Meddelande skickat',
            successMsg: 'Tack! Jag återkommer så snart som möjligt.',
            errorMsg: 'Något gick fel. Försök igen eller maila direkt till edwinlundback@gmail.com.',
        },
        om: {
            heading: 'Om mig',
            subheading: 'Bakgrund',
            tagline: ['Elitalpinist', '15+ år på skidor', 'Nationella tävlingar', 'Civilingenjör'],
            bio1: 'Jag är fullstackutvecklare och ingenjörsstudent med bakgrund inom alpin elitidrott, vilket har präglat mitt arbetssätt genom disciplin, precision och en tydlig drivkraft att ständigt utvecklas.',
            bio2: 'Under studietiden har jag aktivt sökt erfarenheter som breddar mitt perspektiv och förbereder mig för en framtida roll inom IT. Genom allt från programmering och ekonomi till ledarskap har jag utvecklat en förståelse för hur teknik, strategi och affär hänger samman.',
            bio3: 'På sikt vill jag arbeta i en roll med ett tydligt helhetsperspektiv, där jag arbetar mellan teknik, ekonomi och försäljning.',
            stats: [
                { value: '4+', label: 'År programmering' },
                { value: '3+', label: 'Års studier' },
            ],
            interestsLabel: 'Intressen',
            interests: [
                'Alpint',
                'Träning',
                'Teknik',
                'Entreprenörskap',
            ]
        },
    },
    en: {
        nav: {
            links: [
                { label: 'About', href: '#om' },
                { label: 'Projects', href: '#projekt' },
                { label: 'Education', href: '#utbildning' },
                { label: 'Experience', href: '#erfarenhet' },
                { label: 'Skills', href: '#kompetenser' },
                { label: 'Contact', href: '#kontakt' },
            ],
            openMenu: 'Open menu',
            closeMenu: 'Close menu',
            themeLight: 'Switch to light theme',
            themeDark: 'Switch to dark theme',
        },
        hero: {
            greeting: 'Hello, I\'m',
            name: 'Edwin Lundbäck',
            role: 'Fullstack developer & Engineering student',
            description: 'I combine technical understanding with strategic thinking to build solutions that create real value.',
            cta: 'View projects',
            contact: 'Get in touch',
            scroll: 'Scroll down',
        },
        projects: {
            heading: 'Projects',
            subheading: 'Selected Work',
            viewCode: 'GitHub',
            viewLive: 'Live',
            viewReport: 'Report',
            close: 'Close',
            items: [
                {
                    id: 1,
                    title: 'Portfolio',
                    tags: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Vercel'],
                    summary: 'The very site you are currently viewing. Developed with inspiration from my background in alpine skiing and my perspective on how a website should be experienced.',
                    description:
                        'A personal portfolio developed with React, TypeScript, and Tailwind. Built with a strong focus on clean architecture, reusable components, and performance.\n\n' +
                        'The design is inspired by classic typography and a restrained color palette. The slalom theme throughout the site reflects my background in elite alpine skiing and my structured approach to development.',
                    images: [
                        '/project1_2.svg',
                        '/project1_1.svg',
                    ],
                    github: 'https://github.com/edlu2100/Portfolio',
                    live: '',
                },
                {
                    id: 2,
                    title: 'Mobile Application',
                    tags: ['React Native', 'Expo', 'Nativewind'],
                    summary: 'A mobile application currently in development.',
                    description:
                        'A larger mobile application developed since September 2025, focusing on scalable architecture and user-centered design.\n\n' +
                        'The project emphasizes structured code, maintainability, and clear user flows. The application is currently in its final development phase.',
                    images: [
                        '/project2_1.svg',
                    ],
                    blurImage: true,
                    github: '',
                    live: '',
                },
                {
                    id: 3,
                    title: 'Automated Website Monitoring System',
                    tags: ['Laravel', 'Inertia', 'Vue', 'Tailwind', 'MySQL'],
                    summary: 'A monitoring system for websites and technical infrastructure.',
                    description:
                        'An administrative system designed to continuously monitor websites by analyzing HTTP status codes, DNS configuration, and SSL certificates.\n\n' +
                        'The system detects broken links, DNS irregularities, and expiring certificates, sending notifications via Slack and email. The focus was on robust backend logic, structured logging, and a clear interface for managing monitored domains.',
                    images: [
                        '/project4_1.svg'
                    ],
                    github: 'https://github.com/edlu2100/ex-jobb/',
                    live: '',
                    reportUrl: 'https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1878583&dswid=-1400',
                },
                {
                    id: 4,
                    title: 'I-Portalen',
                    tags: ['React', 'Strapi', 'Chakra UI'],
                    summary: 'Frontend development and ongoing improvements.',
                    description:
                        'Responsible for further development and improvement of the I-Portal frontend, focusing on structure, reusable components, and user experience.\n\n' +
                        'The project includes collaboration around content management via Strapi and continuous performance and UI improvements.',
                    images: [
                        '/project3_1.svg'
                    ],
                    github: '',
                    live: 'https://i-portalen.se/',
                },
            ],
        },
        experience: {
            heading: 'Experience',
            subheading: 'Career',
            items: [
                {
                    year: 'Apr 2025  – Present',
                    role: 'Software Developer ',
                    company: 'Skymaker AB',
                    description: 'Developed platform features and prototypes for a SaaS product, translating customer requirements into technical solutions while gaining hands-on experience in production systems and understanding how engineering decisions impact product and business.',
                    tags: ['TypeScript', 'Dynamaker'],
                },
                {
                    year: 'Nov 2025 – Dec 2025',
                    role: 'Shopify Developer & E-commerce Consultant',
                    company: 'Freelance',
                    description: 'Built and launched a customized Shopify store for BigLenz, focusing on design, structure, and conversion.',
                    tags: ['Shopify', 'JavaScript', 'CSS'],
                },
                {
                    year: 'Mar 2025 – Present',
                    role: 'Board Member, Technology Council (Teknologrådet)',
                    company: 'Sveriges Ingenjörer',
                    description: 'Elected representative in the Engineering Council, advocating for engineering students locally and internationally, including at the European Youth Event (EYE) in Malta and Ingenjörsfullmäktige (FUM).',
                    tags: [],
                },
                {
                    year: 'Nov 2024 – Present',
                    role: 'Lead Coordinator for Student Ambassadors',
                    company: 'Sveriges Ingenjörer',
                    description: 'Lead and develop the student ambassador program on campus, overseeing a team of five and driving record membership recruitment results with a 72% conversion rate.',
                    tags: [],
                },
                {
                    year: 'Jan 2025 – Jun 2025',
                    role: 'Finance Assistant',
                    company: 'Solann AB',
                    description: 'Managed ongoing bookkeeping, invoicing, and financial reconciliations in a professional accounting environment. Worked closely with the CEO and Head of Finance, gaining practical insight into corporate finance and its impact on overall business operations.',
                    tags: ['Odoo'],
                },
                {
                    year: '2024 – 2026',
                    role: 'Chair & Vice Chair, Webgroup',
                    company: 'Linköping University',
                    description: 'Led and coordinated the Webgroup, a non-profit student committee responsible for web development and digital initiatives within the section. With responsibility for project allocation, technical direction, and team structure, I worked to improve development workflows, collaboration, and the group’s long-term sustainability.',
                    tags: ['Leadership', 'Project Management'],
                },
                {
                    year: 'Jun 2021 – Aug 2024',
                    role: 'Process Operator',
                    company: 'LKAB',
                    description: 'Monitored and optimized operational processes to ensure stable performance, efficiency, and high safety standards. Worked in high-responsibility environments where precision, discipline, and continuous risk awareness were critical.',
                    tags: [],
                },
                {
                    year: '2021 – 2024',
                    role: 'Elite Alpine Skier',
                    company: 'Team Bauhaus, Sweden ski Association',
                    description: 'Competed at national elite level while combining training with academic studies. Developed discipline, resilience, performance under pressure, and structured long-term goal setting.',
                    tags: ['Performance', 'Discipline'],
                }
            ],
        },
        education: {
            heading: 'Education',
            subheading: 'Academic background',
            items: [
                {
                    year: '2024 – 2029',
                    degree: 'Master of Science in Industrial Engineering and Management',
                    school: 'Linköping University, Sweden',
                    description: 'Studies in technology, economics, and leadership with focus on strategy, systems thinking, and business development. Parallel leadership experience as Chair and Vice Chair of Webgroup.',
                    tags: [],
                },
                {
                    year: '2021 – 2024',
                    degree: 'Higher Education Diploma in Computer Science (Fullstack developer) ',
                    school: 'Mid Sweden University, Sweden',
                    description: 'Education in full-stack web development combining theoretical foundations with practical implementation. Studies were combined with elite alpine skiing at a ski university program and national-level competition as part of Team Bauhaus.',
                    tags: [],
                },
            ],
        },
        skills: {
            heading: 'Skills',
            subheading: 'Technical profile',
            languages: 'Languages',
            technologies: 'Technologies',
            items: {
                languages: ['TypeScript', 'JavaScript', 'PHP', 'C#', '.Net', 'CSS', 'HTML', 'SQL'],
                technologies: ['React.js', 'React Native', 'Vue.js', 'jQuery', 'Laravel', 'ASP.NET', 'Node.js', 'WordPress', 'Dynamaker', 'Tailwind', 'Excel'],
            },
        },
        contact: {
            heading: 'Contact',
            subheading: 'Get in touch',
            nameLabel: 'Name',
            namePlaceholder: 'Your name',
            emailLabel: 'Email',
            emailPlaceholder: 'you@email.com',
            messageLabel: 'Message',
            messagePlaceholder: 'How can I help you?',
            send: 'Send message',
            sending: 'Sending…',
            successTitle: 'Message sent',
            successMsg: 'Thank you! I will get back to you as soon as possible.',
            errorMsg: 'Something went wrong. Try again or email edwinlundback@gmail.com directly.',
        },
        om: {
            heading: 'About me',
            subheading: 'Background',
            tagline: ['Elite alpine skier', '15+ years on snow', 'National competitions', 'Engineering student'],
            bio1: "I am a full-stack developer and engineering student with a background in elite alpine skiing, which has shaped my approach to work through discipline, precision, and a strong drive for continuous improvement.",
            bio2: 'Throughout my studies, I have actively sought experiences that broaden my perspective and prepare me for a future role in technology. From programming and economics to leadership, I have developed an understanding of how technology, strategy, and business intersect.',
            bio3: 'In the long term, I aim to work in a role with a broad, holistic perspective, operating at the intersection of technology, business, and sales.',
            stats: [
                { value: '4+', label: 'Years coding' },
                { value: '3+', label: 'Years studied' },
            ],
            interestsLabel: 'Interests',
            interests: [
                'Alpine skiing',
                'Training',
                'Technology & digital products',
                'Entrepreneurship',
            ]
        },
    },
}
