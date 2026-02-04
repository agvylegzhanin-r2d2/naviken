// Mobile menu toggle (startup-style hamburger) - run when DOM is ready
function initMobileMenu() {
    var menuToggle = document.getElementById('menu-toggle');
    var floatingNav = document.getElementById('floating-nav');
    var navBackdrop = document.getElementById('nav-backdrop');

    function openMobileNav() {
        if (!floatingNav || !navBackdrop || !menuToggle) return;
        floatingNav.classList.add('is-open');
        navBackdrop.classList.add('is-visible');
        menuToggle.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close menu');
        navBackdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        if (!floatingNav || !navBackdrop || !menuToggle) return;
        floatingNav.classList.remove('is-open');
        navBackdrop.classList.remove('is-visible');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        navBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function toggleMobileNav(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (floatingNav && floatingNav.classList.contains('is-open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileNav();
        });
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMobileNav);
    }

    // Anchor links: scroll to section and close mobile menu (delegated so nav links work on mobile)
    document.body.addEventListener('click', function (e) {
        var link = e.target && e.target.closest('a[href^="#"]');
        if (!link) return;
        var href = link.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        e.stopPropagation();
        var target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        setTimeout(closeMobileNav, 350);
    }, true);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// Highlight active navigation item using IntersectionObserver (no scroll handler = smoother mobile scroll)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function setActiveNav(sectionId) {
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + sectionId);
    });
}

var activeSectionObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.getAttribute('id');
            if (id) setActiveNav(id);
        });
    },
    { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
);

sections.forEach(function (section) {
    activeSectionObserver.observe(section);
});

// Set initial active section on load
window.addEventListener('load', function () {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
        var top = section.offsetTop;
        var bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
            setActiveNav(section.getAttribute('id'));
        }
    });
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections - only hide sections below the fold to avoid blank screen on load
document.querySelectorAll('section').forEach(section => {
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
    }
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Add hover effects for interactive elements
document.querySelectorAll('.step, .use-case-item, .benefit-item, .team-member').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Contact email click handler
document.querySelector('.contact-email a')?.addEventListener('click', function(e) {
    // Allow default behavior (mailto link)
    console.log('Contact email clicked');
});

// Language Switcher
let currentLang = 'en';

const translations = {
    en: {
        // Navigation
        nav_home: 'Home',
        nav_mission: 'Mission',
        nav_how: 'How it Works',
        nav_prototype: 'Our Device',
        nav_usecases: 'Use Cases',
        nav_why: 'Why Navi-ken',
        nav_team: 'Team',
        nav_partners: 'Partners',
        nav_contact: 'Contact',
        
        // Hero
        hero_subtitle: 'Your digital guide dog inside shopping malls, stores and train stations',
        
        // Mission
        mission_title: 'Our mission',
        mission_text1: 'Visually impaired people struggle when going outside, travelling & shopping alone:',
        mission_text2: 'We provide solution for independent enjoyable shopping, travel & leisure without assistance!',
        
        // How it works
        how_title: 'How does it work?',
        how_heading: 'UWB anchors provide precise location in the mall inside the mall or in a particular store',
        how_highlight: 'You have a tiny wearable device with <strong>vibrations to navigate with it</strong>',
        how_step1: 'Do a voice command where you want to go',
        how_step2: 'Vibrations will guide you towards the desired area',
        how_features_title: 'Key Features:',
        how_feature1: 'Voice-activated destination selection',
        how_feature2: 'Precise UWB positioning technology',
        how_feature3: 'Intuitive haptic feedback guidance',
        how_feature4: 'Works without smartphone',
        feature1: 'Operates <strong>without network connectivity</strong>',
        feature2: '<strong>No phone needed</strong>',
        feature3: 'UWB range 1cm – 50m',
        feature4: '<strong>AI positioning</strong>',
        feature5: 'Intuitive haptic feedback',
        feature6: '<strong>Voice control</strong>',
        feature7: '<strong>Hearing unoccupied!</strong>',
        feature8: 'Intimate (nobody knows you are using it)',
        how_highlight_text: '<strong>It is simply a new sense</strong> and your brain adapts to it through practicing, so it becomes very intuitive to navigate with it.',
        
        // Prototype
        prototype_title: 'How does it look like?',
        prototype_text: 'We are iteratively working on our prototype to make it better every time. We are currently finishing the <strong>beta MVP</strong>.',
        
        // Why Choose
        why_title: 'Why choosing Navi-ken for navigation',
        why_benefit1: 'No screen needed!',
        why_benefit2: 'Simple to learn and use',
        why_benefit3: 'Hearing is left unoccupied!',
        why_benefit4: 'Less mental load',
        
        // Use Cases
        usecases_title: 'Future use cases',
        usecases_intro: 'We are actively advancing R&D to expand the potential applications of our technology.',
        usecases_hazard: 'Hazard places awareness',
        usecases_industrial: 'Industrial and factory safety applications with UWB positioning',
        usecases_outdoor: 'Haptic outdoor navigation through integration with GPS',
        
        // Team
        team_title: 'Meet Our Team',
        team_intro: 'We do our best to let our product help as many people as possible.',
        team_alex: 'Alexey Vylegzhanin',
        team_alex_role: 'Founder & Lead Engineer',
        team_alex_description: 'Making the final product and delivering it to customers.',
        team_sergey: 'Sergey Samsonov',
        team_sergey_role: 'Co-Founder & Technical Director',
        team_sergey_description: 'Coding the insane amount of lines to help you navigate.',
        team_chris_description: 'Most impressive hardware and software developer with experience in prototyping and 3D design.',
        
        // Backed by
        backed_by_title: 'Backed by OIST Innovation',
        
        // Connected to
        partners_title: 'Connected to',
        
        // Contact
        contact_title: 'Contact us:',
        contact_text: 'Interested in learning more about Nabi-ken or collaborating with us?',
        contact_reach: 'Reach out to us:',
        waiting_list_btn: 'Sign up for waiting list',
        
        // Footer
        footer_copyright: '© 2026 Navi-ken. All rights reserved.'
    },
    ja: {
        // Navigation
        nav_home: 'ホーム',
        nav_mission: 'ミッション',
        nav_how: '仕組み',
        nav_prototype: 'デバイス',
        nav_usecases: '活用事例',
        nav_why: 'Navi-kenを選ぶ理由',
        nav_team: 'チーム',
        nav_partners: 'パートナー',
        nav_contact: 'お問い合わせ',
        
        // Hero
        hero_subtitle: 'ショッピングモール、店舗、駅構内でのデジタル盲導犬',
        
        // Mission
        mission_title: '私たちのミッション',
        mission_text1: '視覚障害者は外出、旅行、買い物を一人でする際に困難を抱えています：',
        mission_text2: '私たちは介助なしで、独立して楽しくショッピング、旅行、レジャーを楽しむためのソリューションを提供します！',
        
        // How it works
        how_title: 'どのように機能するか？',
        how_heading: 'UWBアンカーがモール内や特定の店舗内で正確な位置情報を提供',
        how_highlight: '振動で<strong>ナビゲーションする</strong>小型ウェアラブルデバイスを装着',
        how_step1: '音声コマンドで行きたい場所を伝える',
        how_step2: '振動が目的地まで誘導します',
        how_features_title: '主な機能：',
        how_feature1: '音声による目的地選択',
        how_feature2: '高精度UWB測位技術',
        how_feature3: '直感的な触覚フィードバック誘導',
        how_feature4: 'スマートフォン不要',
        feature1: '<strong>ネットワーク接続不要</strong>で動作',
        feature2: '<strong>スマートフォン不要</strong>',
        feature3: 'UWB範囲 1cm – 50m',
        feature4: '<strong>AI測位</strong>',
        feature5: '直感的な触覚フィードバック',
        feature6: '<strong>音声コントロール</strong>',
        feature7: '<strong>聴覚は自由に使えます！</strong>',
        feature8: 'プライベート（使用していることは誰にも分かりません）',
        how_highlight_text: '<strong>これは単に新しい感覚です</strong>、練習を重ねることで脳が適応し、ナビゲーションが非常に直感的になります。',
        
        // Prototype
        prototype_title: 'どのように見えるか？',
        prototype_text: '私たちは常に改良を重ねながらプロトタイプを開発しています。現在、<strong>ベータ版MVP</strong>を完成させている段階です。',
        
        // Why Choose
        why_title: 'Navi-kenをナビゲーションに選ぶ理由',
        why_benefit1: '画面不要！',
        why_benefit2: '学習と使用が簡単',
        why_benefit3: '聴覚は自由に使えます！',
        why_benefit4: '精神的負担が少ない',
        
        // Use Cases
        usecases_title: '将来の活用事例',
        usecases_intro: '私たちは技術の応用可能性を拡大するため、積極的に研究開発を進めています。',
        usecases_hazard: '危険場所の認識',
        usecases_industrial: 'UWB測位を使用した工場・産業安全アプリケーション',
        usecases_outdoor: 'GPS統合による屋外触覚ナビゲーション',
        
        // Team
        team_title: 'チームメンバー',
        team_intro: '私たちの製品ができるだけ多くの人々を支援できるよう、最善を尽くしています。',
        team_alex: 'アレクセイ・ヴィレグザニン',
        team_alex_role: '創設者＆リードエンジニア',
        team_alex_description: '最終製品を作り、お客様にお届けする。',
        team_sergey: 'セルゲイ・サムソノフ',
        team_sergey_role: '共同創設者＆テクニカルディレクター',
        team_sergey_description: 'ナビゲーションをサポートするための膨大なコード行数を書く。',
        team_chris_description: 'プロトタイピングと3Dデザインの経験を持つ、最も印象的なハードウェア・ソフトウェア開発者。',
        
        // Backed by
        backed_by_title: 'OIST Innovationの支援',
        
        // Connected to
        partners_title: 'つながり',
        
        // Contact
        contact_title: 'お問い合わせ：',
        contact_text: 'Nabi-kenについてもっと知りたい、または協力したいですか？',
        contact_reach: 'お気軽にご連絡ください：',
        waiting_list_btn: 'ウェイティングリストに登録',
        
        // Footer
        footer_copyright: '© 2026 Navi-ken. All rights reserved.'
    }
};

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update navigation
    document.querySelectorAll('.nav-menu a').forEach((link, index) => {
        const keys = ['nav_home', 'nav_mission', 'nav_how', 'nav_prototype', 'nav_why', 'nav_usecases', 'nav_team', 'nav_contact'];
        if (keys[index]) {
            link.textContent = translations[lang][keys[index]];
        }
    });
    
    // Update language button
    if (lang === 'en') {
        document.querySelector('.lang-en').style.display = 'inline';
        document.querySelector('.lang-ja').style.display = 'none';
    } else {
        document.querySelector('.lang-en').style.display = 'none';
        document.querySelector('.lang-ja').style.display = 'inline';
    }
    
    // Update content using data-translate attributes
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            if (element.innerHTML.includes('<strong>')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update images with language-specific versions
    document.querySelectorAll('img[data-img-en][data-img-ja]').forEach(img => {
        if (lang === 'en') {
            img.src = img.getAttribute('data-img-en');
        } else {
            img.src = img.getAttribute('data-img-ja');
        }
    });
}

// Language toggle button event listener
document.getElementById('lang-toggle')?.addEventListener('click', function() {
    switchLanguage(currentLang === 'en' ? 'ja' : 'en');
});
