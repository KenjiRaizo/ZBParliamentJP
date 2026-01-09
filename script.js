// Language translations
const translations = {
    ja: {
        nav_schedule: "会議日程",
        nav_members: "議員一覧",
        nav_committees: "委員会",
        nav_legislation: "法律",
        nav_voting: "表決",
        nav_records: "議事録",
        nav_budget: "予算",
        nav_treaties: "条約",
        nav_petition: "請願",
        hero_title: "日本国会へようこそ",
        hero_subtitle: "国の最高機関であり、国の唯一の立法機関です",
        btn_view_schedule: "日程を見る",
        btn_view_members: "議員を見る",
        current_session: "現在の国会",
        session_dates: "令和7年1月 - 令和7年6月",
        session_status: "通常国会",
        stat_bills: "法案",
        stat_votes: "表決",
        stat_petitions: "請願",
        latest_news: "最新ニュース",
        news_1: "第213回国会の開会式が行われました。",
        news_2: "新しい法案が提出されました。",
        news_3: "衆議院で予算審議が始まりました。",
        quick_access: "クイックアクセス",
        schedule_title: "会議日程",
        schedule_subtitle: "第213回国会の会議日程",
        members_title: "議員一覧",
        committees_title: "委員会",
        legislation_title: "法律",
        voting_title: "表決",
        records_title: "議事録",
        budget_title: "予算",
        treaties_title: "条約",
        petition_title: "請願"
    },
    en: {
        nav_schedule: "Schedule",
        nav_members: "Members",
        nav_committees: "Committees",
        nav_legislation: "Legislation",
        nav_voting: "Voting",
        nav_records: "Records",
        nav_budget: "Budget",
        nav_treaties: "Treaties",
        nav_petition: "Petition",
        hero_title: "Welcome to the National Diet of Japan",
        hero_subtitle: "The supreme organ of state power and the sole law-making organ of the State",
        btn_view_schedule: "View Schedule",
        btn_view_members: "View Members",
        current_session: "Current Session",
        session_dates: "January 2025 - June 2025",
        session_status: "Regular Session",
        stat_bills: "Bills",
        stat_votes: "Votes",
        stat_petitions: "Petitions",
        latest_news: "Latest News",
        news_1: "The 213th Diet session has begun with the opening ceremony.",
        news_2: "New legislation has been submitted for consideration.",
        news_3: "Budget deliberations have commenced in the House of Representatives.",
        quick_access: "Quick Access",
        schedule_title: "Schedule",
        schedule_subtitle: "213th Diet Session Schedule",
        members_title: "Members",
        committees_title: "Committees",
        legislation_title: "Legislation",
        voting_title: "Voting",
        records_title: "Records",
        budget_title: "Budget",
        treaties_title: "Treaties",
        petition_title: "Petition"
    }
};

// Get saved language or default to Japanese
let currentLang = localStorage.getItem('diet-language') || 'ja';

// Set language function
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('diet-language', lang);
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('lang-' + lang).classList.add('active');
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLang);
    
    // Animate statistics on scroll
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(num => {
                    animateCounter(num);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.session-stats').forEach(stats => {
        observer.observe(stats);
    });
});

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/,/g, ''));
    const duration = 1000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Table row click handlers
document.querySelectorAll('tbody tr').forEach(row => {
    row.addEventListener('click', function() {
        this.classList.toggle('selected');
    });
});

// Search functionality
function performSearch(query) {
    if (query.length < 2) return [];
    
    const searchableContent = document.body.textContent.toLowerCase();
    const results = [];
    
    // Search through all pages
    const pages = ['index', 'schedule', 'members', 'legislation', 'voting', 'records', 'budget', 'treaties', 'petition'];
    
    pages.forEach(page => {
        const pageContent = document.querySelectorAll(`[data-page="${page}"]`);
        pageContent.forEach(item => {
            if (item.textContent.toLowerCase().includes(query)) {
                results.push({
                    page: page,
                    content: item.textContent.substring(0, 100) + '...'
                });
            }
        });
    });
    
    return results;
}

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = e.clientX - rect.left + 'px';
        ripple.style.top = e.clientY - rect.top + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
