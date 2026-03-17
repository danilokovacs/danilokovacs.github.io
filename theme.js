(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const STORAGE_KEY = 'danilokovacs-theme';

    function isLocalStorageAvailable() {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch {
            return false;
        }
    }

    function retrieveStoredTheme() {
        if (!isLocalStorageAvailable()) {
            return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme) return savedTheme;
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyThemeToDocument(theme) {
        html.setAttribute('data-theme', theme);
        if (isLocalStorageAvailable()) {
            try {
                localStorage.setItem(STORAGE_KEY, theme);
            } catch {
                // Silently handle storage errors
            }
        }

        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Theme changed to ${theme} mode`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    function switchTheme() {
        const currentTheme = html.getAttribute('data-theme');
        applyThemeToDocument(currentTheme === 'dark' ? 'light' : 'dark');
    }

    applyThemeToDocument(retrieveStoredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', switchTheme);
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchTheme();
            }
        });
        themeToggle.setAttribute('tabindex', '0');
    }

    window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!isLocalStorageAvailable() || !localStorage.getItem(STORAGE_KEY)) {
            applyThemeToDocument(e.matches ? 'dark' : 'light');
        }
    });

    const style = document.createElement('style');
    style.textContent = '.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}';
    document.head.appendChild(style);
})();

(function() {
    const langToggle = document.getElementById('lang-toggle');
    const html = document.documentElement;
    const STORAGE_KEY = 'danilokovacs-lang';

    function isLocalStorageAvailable() {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch {
            return false;
        }
    }

    const translations = {
        en: {
            'profile-name': 'Danilo Kovacs',
            'welcome-title': 'About Me',
            'welcome-desc-1': 'Software engineer since 2022, specialized in Kotlin and Java. Full application lifecycle experience from conception to production in critical financial environments.',
            'welcome-desc-2': 'Developing systems serving ~30M customers, focusing on distributed architectures, scalability, resilience and high availability for financial operations.',
            'welcome-desc-3': 'Combining business understanding with observability and infrastructure expertise to create effective and maintainable solutions.',
            'graduation-title': 'Graduation / University Projects',
            'graduation-desc': 'Academic projects at SPTECH School, applying software engineering concepts and agile methodologies.',
            'pharmcs-title': 'Pharmcs',
            'pharmcs-badge': '1st SEM - SPTECH School',
            'pharmcs-summary': 'Pharmcs is a solution for monitoring humidity and temperature of pharmaceutical refrigerators.',
            'pharmcs-desc': 'Monitoring via Arduino with simulated sensors, measuring temperature and humidity with real-time alerts and notifications.',
            'tech-intro': 'Technologies used:',
            'mart-title': 'Mart',
            'mart-badge': '2nd SEM - SPTECH School',
            'mart-summary': 'Mart is a solution for monitoring fast food kiosks.',
            'mart-desc': 'Monitoring via AWS EC2 capturing CPU, RAM, disk and system data for self-service kiosk simulation with real-time alerts.',
            'ido-title': 'iDO',
            'ido-badge': '3rd SEM - SPTECH School',
            'ido-summary': 'iDo is a task management solution with methodologies assisting prioritization and focus on task completion.',
            'ido-desc': 'Task management system integrating Pomodoro and Eisenhower Matrix for automatic prioritization and focus techniques.',
            'experience-title': 'Professional Experience',
            'senior-role': 'Senior Tech Analyst',
            'c6-bank': 'C6 Bank',
            'senior-date': 'Jan 2026 - Present',
            'senior-desc': 'Acting in the <span class="highlight">Cards – Invoices, Installments and Annual Fee</span> squad, responsible for critical solutions impacting the entire customer base. Distributed systems architecture, resilience strategies and event governance for high availability in financial operations at scale.',
            'senior-point-1': 'End-to-end implementation of new payment methods impacting millions of card customers.',
            'senior-point-2': 'Development of solutions for accounting and regulatory adjustments of installments.',
            'senior-point-3': 'Architecture of distributed cache via files in Go for performance optimization and latency reduction.',
            'senior-point-4': 'Implementation of event-based data locks and reprocessing mechanisms for consistency in distributed systems.',
            'senior-point-5': 'Participation in troubleshooting and crisis rooms, with on-call duties.',
            'senior-point-6': 'Mapping and implementation of improvements for invoice information resilience.',
            'senior-point-7': 'Definition of event-driven payment methods with emission and consumption architecture for integration between domains.',
            'senior-point-8': 'Control of fee campaigns with cache and performance strategies to scale during high demand periods.',
            'analyst-role': 'Tech Analyst',
            'analyst-date': 'Apr 2025 - Jan 2026 · 10 months',
            'analyst-desc': 'Development and evolution of transactional APIs in Card squad – Invoices, Installments and Annual Fee, with resilience, idempotency, async retries and storage strategies.',
            'analyst-point-1': 'HLD proposals for new developments, performance improvement and support for performance, quality and integration tests.',
            'analyst-point-2': 'Incident monitoring and triage, with solutions to mitigate technical debt and prioritize deliveries.',
            'junior-role': 'Junior Tech Analyst',
            'junior-date': 'Jul 2023 - Mar 2025 · 1 year 9 months',
            'junior-desc': 'Transactional API development in Card squad – Invoices and Installments, with resilience, async processes, idempotency and PLD practices.',
            'junior-point-1': 'Transactional monitoring for alert generation and tracking via Splunk and Grafana.',
            'junior-point-2': 'Information internalization for high availability and domain breaking to prioritize performance in backoffice requests.',
            'intern-role': 'Software Engineering Intern',
            'intern-date': 'Jan 2022 - Jun 2023 · 1 year 6 months',
            'intern-desc': 'API internalization for invoice, transaction and timeline domains in Core Cards squad.',
            'intern-point-1': 'Periodic event-based invoice information retrieval mechanism.',
            'intern-point-2': 'Platform improvements with FinOps and data lifecycle practices, migrating to optimized servers.',
            'tech-stack-title': 'Tech Stack',
            'languages': 'Languages',
            'frameworks': 'Frameworks and Libraries',
            'tools': 'Tools',
            'databases': 'Databases',
            'methodologies': 'Methodologies and Practices',
            'recognition-title': 'Recognition',
            'recognition-desc': 'Recognized with the <span class="highlight">Catálise</span> award after 11 months of internship, a C6 Bank program valuing employees who excel beyond their work assignments.',
            'footer': '© 2026 Danilo Kovacs. All rights reserved.'
        },
        pt: {
            'profile-name': 'Danilo Kovacs',
            'welcome-title': 'Sobre Mim',
            'welcome-desc-1': 'Engenheiro de software desde 2022, especializado em Kotlin e Java. Experiência completa no ciclo de vida de aplicações, desde a concepção até produção em ambientes críticos do setor financeiro.',
            'welcome-desc-2': 'Desenvolvo sistemas que atendem ~30M de clientes, focando em arquiteturas distribuídas, escalabilidade, resiliência e alta disponibilidade para operações financeiras.',
            'welcome-desc-3': 'Combino entendimento de negócio com expertise em observabilidade e infraestrutura para criar soluções eficazes e manuteníveis.',
            'graduation-title': 'Graduação / Projetos Universitários',
            'graduation-desc': 'Projetos acadêmicos da SPTECH School, aplicando conceitos de engenharia de software e metodologias ágeis.',
            'pharmcs-title': 'Pharmcs',
            'pharmcs-badge': '1º SEM - SPTECH School 👨‍🎓',
            'pharmcs-summary': 'Pharmcs é uma solução para o monitoramento de umidade e temperatura de geladeiras farmacêuticas.',
            'pharmcs-desc': 'Monitoramento via Arduino com simulação de sensores acoplados às geladeiras, gerando medições de temperatura e umidade com alertas e notificações em tempo real.',
            'tech-intro': 'Tecnologias utilizadas:',
            'mart-title': 'Mart',
            'mart-badge': '2º SEM - SPTECH School 👨‍🎓',
            'mart-summary': 'Mart é uma solução para o monitoramento de totens de fast food.',
            'mart-desc': 'Monitoramento via EC2 na AWS capturando dados de CPU, RAM, disco e sistema para simulação de totens de autoatendimento com alertas e notificações em tempo real.',
            'ido-title': 'iDO',
            'ido-badge': '3º SEM - SPTECH School 👨‍🎓',
            'ido-summary': 'iDo é uma solução para gerenciamento de tarefas com implementações de metodologias que auxiliam no processo de priorização e foco na conclusão de tarefas.',
            'ido-desc': 'Sistema de gerenciamento de tarefas integrando metodologias Pomodoro e Matriz de Eisenhower para priorização automática e técnicas de foco na execução.',
            'experience-title': 'Experiência Profissional',
            'senior-role': 'Senior Tech Analyst',
            'c6-bank': 'C6 Bank',
            'senior-date': 'jan 2026 - presente',
            'senior-desc': 'Atuação na squad de <span class="highlight">Cartões – Faturas, Parcelamentos e Anuidade</span>, responsável por soluções críticas que impactam toda a base de clientes. Arquitetura de sistemas distribuídos, estratégias de resiliência e governança de eventos para alta disponibilidade em operações financeiras de escala.',
            'senior-point-1': 'Implementação end-to-end de novos métodos de pagamento impactando milhões de clientes com cartões.',
            'senior-point-2': 'Desenvolvimento de soluções para ajustes contábeis e regulatórios de parcelamentos.',
            'senior-point-3': 'Arquitetura de cache distribuído via arquivos em Go para otimização de performance e redução de latência.',
            'senior-point-4': 'Implementação de locks de dados baseados em eventos e mecanismos de reprocessamento para consistência em sistemas distribuídos.',
            'senior-point-5': 'Participação em troubleshooting e salas de crise, com atuação em oncall.',
            'senior-point-6': 'Mapeamento e implementação de melhorias para resiliência das informações de fatura.',
            'senior-point-7': 'Definição de métodos de pagamento orientados a eventos com arquitetura de emissão e consumo para integração entre domínios.',
            'senior-point-8': 'Controle de campanhas de taxas com estratégias de cache e performance para escalar em períodos de alta demanda.',
            'analyst-role': 'Tech Analyst',
            'analyst-date': 'abr 2025 - jan 2026 · 10 meses',
            'analyst-desc': 'Desenvolvimento e evolução de APIs transacionais na squad de Cartões – Faturas, Parcelamentos e Anuidade, com práticas de resiliência, idempotência, retentativas assíncronas e estratégias de armazenamento.',
            'analyst-point-1': 'Propostas de HLD para novos desenvolvimentos, melhoria de performance e suporte a testes de performance, qualidade e integração.',
            'analyst-point-2': 'Acompanhamento e triagem de incidentes, elaborando soluções para mitigar débitos técnicos e priorizar entregas.',
            'junior-role': 'Junior Tech Analyst',
            'junior-date': 'jul 2023 - mar 2025 · 1 ano 9 meses',
            'junior-desc': 'Desenvolvimento de APIs transacionais na squad de Cartões – Faturas e Parcelamentos, com práticas de resiliência, processos assíncronos, idempotência e PLD.',
            'junior-point-1': 'Monitoramento transacional para geração de alertas e acompanhamento via Splunk e Grafana.',
            'junior-point-2': 'Internalização de informações para alta disponibilidade e quebra de domínios para priorizar performance em requisições de backoffice.',
            'intern-role': 'Estagiário em Engenharia de Software',
            'intern-date': 'jan 2022 - jun 2023 · 1 ano 6 meses',
            'intern-desc': 'Internalização de APIs para domínios de fatura, transações e timeline na squad de Core Cards.',
            'intern-point-1': 'Elaboração de mecânica para busca periódica de informações de fatura a partir de eventos.',
            'intern-point-2': 'Melhorias na plataforma com prática de FinOps e ciclo de vida dos dados, com migrações para servidores otimizados.',
            'tech-stack-title': 'Tech Stack',
            'languages': 'Linguagens',
            'frameworks': 'Frameworks e Bibliotecas',
            'tools': 'Ferramentas',
            'databases': 'Banco de Dados',
            'methodologies': 'Metodologias e Práticas',
            'recognition-title': 'Reconhecimentos',
            'recognition-desc': 'Reconhecido com o prêmio <span class="highlight">Catálise</span> após 11 meses de estágio, programa do C6 Bank que valoriza colaboradores que se destacam além das atribuições de trabalho.',
            'footer': '© 2026 Danilo Kovacs. Todos os direitos reservados.'
        }
    };

    function retrieveStoredLanguage() {
        if (!isLocalStorageAvailable()) {
            return 'pt';
        }
        return localStorage.getItem(STORAGE_KEY) || 'pt';
    }

    function switchLanguageAndApplyTranslations(language) {
        html.setAttribute('data-lang', language);
        html.setAttribute('lang', language);
        if (isLocalStorageAvailable()) {
            try {
                localStorage.setItem(STORAGE_KEY, language);
            } catch {
                // Silently handle storage errors
            }
        }
        updateDocumentContentWithTranslations(language);
        updateLanguageToggleAccessibilityLabels(language);

        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Language changed to ${language === 'en' ? 'English' : 'Portuguese'}`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    function updateDocumentContentWithTranslations(language) {
        const translationsForLang = translations[language];
        const profileName = document.querySelector('.profile-name');
        if (profileName) profileName.textContent = translationsForLang['profile-name'];

        const welcomeTitle = document.querySelector('.section-title');
        if (welcomeTitle) {
            const emoji = welcomeTitle.querySelector('.emoji');
            welcomeTitle.innerHTML = '';
            welcomeTitle.appendChild(emoji);
            welcomeTitle.appendChild(document.createTextNode(' ' + translationsForLang['welcome-title']));
        }

        const welcomeDescs = document.querySelectorAll('.section-description');
        if (welcomeDescs.length >= 3) {
            welcomeDescs[0].textContent = translationsForLang['welcome-desc-1'];
            welcomeDescs[1].textContent = translationsForLang['welcome-desc-2'];
            welcomeDescs[2].textContent = translationsForLang['welcome-desc-3'];
        }

        const gradTitle = document.querySelector('.section-title-text');
        if (gradTitle) {
            const emoji = gradTitle.querySelector('.emoji');
            gradTitle.innerHTML = '';
            gradTitle.appendChild(emoji);
            gradTitle.appendChild(document.createTextNode(' ' + translationsForLang['graduation-title']));
        }

        const gradDesc = document.querySelector('.section-description-text');
        if (gradDesc) gradDesc.textContent = translationsForLang['graduation-desc'];

        updateProjectCardContent('#pharmcs-card', {
            title: translationsForLang['pharmcs-title'],
            badge: translationsForLang['pharmcs-badge'],
            summary: translationsForLang['pharmcs-summary'],
            description: translationsForLang['pharmcs-desc']
        });
        updateProjectCardContent('#mart-card', {
            title: translationsForLang['mart-title'],
            badge: translationsForLang['mart-badge'],
            summary: translationsForLang['mart-summary'],
            description: translationsForLang['mart-desc']
        });
        updateProjectCardContent('#ido-card', {
            title: translationsForLang['ido-title'],
            badge: translationsForLang['ido-badge'],
            summary: translationsForLang['ido-summary'],
            description: translationsForLang['ido-desc']
        });

        document.querySelectorAll('.tech-intro').forEach(intro => intro.textContent = translationsForLang['tech-intro']);

        const expTitle = document.querySelector('.experience-card .card-title');
        if (expTitle) {
            const emoji = expTitle.querySelector('.emoji');
            expTitle.innerHTML = '';
            expTitle.appendChild(emoji);
            expTitle.appendChild(document.createTextNode(' ' + translationsForLang['experience-title']));
        }

        const experienceItems = document.querySelectorAll('.experience-item');
        if (experienceItems.length >= 4) {
            updateExperienceItemDetails(experienceItems[0], {
                role: translationsForLang['senior-role'],
                company: translationsForLang['c6-bank'],
                date: translationsForLang['senior-date'],
                description: translationsForLang['senior-desc'],
                points: [
                    translationsForLang['senior-point-1'],
                    translationsForLang['senior-point-2'],
                    translationsForLang['senior-point-3'],
                    translationsForLang['senior-point-4'],
                    translationsForLang['senior-point-5'],
                    translationsForLang['senior-point-6'],
                    translationsForLang['senior-point-7'],
                    translationsForLang['senior-point-8']
                ]
            });
            updateExperienceItemDetails(experienceItems[1], {
                role: translationsForLang['analyst-role'],
                company: translationsForLang['c6-bank'],
                date: translationsForLang['analyst-date'],
                description: translationsForLang['analyst-desc'],
                points: [translationsForLang['analyst-point-1'], translationsForLang['analyst-point-2']]
            });
            updateExperienceItemDetails(experienceItems[2], {
                role: translationsForLang['junior-role'],
                company: translationsForLang['c6-bank'],
                date: translationsForLang['junior-date'],
                description: translationsForLang['junior-desc'],
                points: [translationsForLang['junior-point-1'], translationsForLang['junior-point-2']]
            });
            updateExperienceItemDetails(experienceItems[3], {
                role: translationsForLang['intern-role'],
                company: translationsForLang['c6-bank'],
                date: translationsForLang['intern-date'],
                description: translationsForLang['intern-desc'],
                points: [translationsForLang['intern-point-1'], translationsForLang['intern-point-2']]
            });
        }

        const techStackTitle = document.querySelector('.tech-stack-card .card-title');
        if (techStackTitle) {
            const emoji = techStackTitle.querySelector('.emoji');
            techStackTitle.innerHTML = '';
            techStackTitle.appendChild(emoji);
            techStackTitle.appendChild(document.createTextNode(' ' + translationsForLang['tech-stack-title']));
        }

        const categoryKeys = ['languages', 'frameworks', 'tools', 'databases', 'methodologies'];
        document.querySelectorAll('.tech-category-title').forEach((categoryTitle, index) => {
            if (categoryKeys[index]) categoryTitle.textContent = translationsForLang[categoryKeys[index]];
        });

        const recTitle = document.querySelector('.recognition-card .card-title');
        if (recTitle) {
            const emoji = recTitle.querySelector('.emoji');
            recTitle.innerHTML = '';
            recTitle.appendChild(emoji);
            recTitle.appendChild(document.createTextNode(' ' + translationsForLang['recognition-title']));
        }

        const recDesc = document.querySelector('.recognition-card .card-content p');
        if (recDesc) recDesc.innerHTML = translationsForLang['recognition-desc'];

        const footer = document.querySelector('.footer p');
        if (footer) footer.textContent = translationsForLang['footer'];
    }

    function updateProjectCardContent(selector, content) {
        const card = document.querySelector(selector);
        if (!card) return;

        const title = card.querySelector('.project-title');
        if (title) {
            const emoji = title.querySelector('.emoji');
            title.innerHTML = '';
            title.appendChild(emoji);
            title.appendChild(document.createTextNode(' ' + content.title));
        }

        const badge = card.querySelector('.project-badge');
        if (badge) badge.textContent = content.badge;

        const summary = card.querySelector('.project-summary');
        if (summary) summary.textContent = content.summary;

        const description = card.querySelector('.project-description');
        if (description) description.textContent = content.description;
    }

    function updateExperienceItemDetails(item, content) {
        const role = item.querySelector('.experience-role');
        if (role) role.textContent = content.role;

        const company = item.querySelector('.experience-company');
        if (company) company.textContent = content.company;

        const date = item.querySelector('.experience-date');
        if (date) date.textContent = content.date;

        const description = item.querySelector('.experience-details p');
        if (description) description.innerHTML = content.description;

        const points = item.querySelector('.experience-points');
        if (points && content.points.length > 0) {
            points.innerHTML = '';
            content.points.forEach(point => {
                if (point) {
                    const li = document.createElement('li');
                    li.textContent = point;
                    points.appendChild(li);
                }
            });
        }
    }

    function updateLanguageToggleAccessibilityLabels(currentLanguage) {
        if (langToggle) {
            langToggle.setAttribute('aria-label', `Switch to ${currentLanguage === 'en' ? 'Portuguese' : 'English'}`);
        }
    }

    function toggleBetweenLanguages() {
        const currentLanguage = html.getAttribute('data-lang');
        switchLanguageAndApplyTranslations(currentLanguage === 'pt' ? 'en' : 'pt');
    }

    switchLanguageAndApplyTranslations(retrieveStoredLanguage());

    if (langToggle) {
        langToggle.addEventListener('click', toggleBetweenLanguages);
        langToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleBetweenLanguages();
            }
        });
        langToggle.setAttribute('tabindex', '0');
    }
})();
