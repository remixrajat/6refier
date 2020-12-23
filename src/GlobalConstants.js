import notificationSound from "./images/shared/notificationTone.mp3";
const audio = new Audio(notificationSound);
export var URL_TEXT = "/";
export var GOOGLE_ANLYTICS_CODE = 'UA-92641533-2';
/**change below */
export const MEDIA_URL_TEXT = 'https://refiersp1.sgp1.digitaloceanspaces.com/';
export let SOCKETURL = 'https://refierservices.refier.com/';
// export const SOCKETURL = 'https://demorefierservices.refier.com/';
// export const SOCKETURL = 'http://localhost:8005/';
export var DEV_ENV_FRONTEND = false;
/**change above */
if (process && process.env.NODE_ENV === "development") {
    DEV_ENV_FRONTEND = true;
}

if (DEV_ENV_FRONTEND) {
    URL_TEXT = 'http://localhost:8000/';
    SOCKETURL = 'https://demorefierservices.refier.com/';
    // URL_TEXT = 'http://192.168.0.9:8000/';
    // URL_TEXT = 'https://www.refier.com';
    // URL_TEXT = 'https://demo.refier.com/';
    GOOGLE_ANLYTICS_CODE = 'UA-92641533-4'
} else {
    URL_TEXT = '/';
    removeConsoleLogging();
}
export const REFIER_SCREENSHARE_EXTENSION_URL = 'https://chrome.google.com/webstore/detail/refier-webinar-screen-cap/egoajammfbodhdnkjhkpolhfjbmmafcl'
export const OPENVIDU_SECRET = "xEWdvtNpgtpJwZBvAPh7AKj2tuMdXWTZS7Nqaxr7jFandX6AKcbWF3tMqWHVTCjcb6PGxYr4eEJbepnJyfhuMuEXEjEDzbp3QQwBaPmfFNmnT5SUE8A8ZHFBzK5JaLzJBPAyjtexhHZWz3Kb4FUDjQuePJj2rJKJ2cmL7bxzuVDw5jqQqLRhg9wx5h6yzHN"

function removeConsoleLogging() {
    window.console.log = () => { };
    window.console.warn = () => { };
    window.console.info = () => { };
    window.console.error = () => { };
    window.console.assert = () => { };
}


// export const MEDIA_URL_TEXT = URL_TEXT + 'media/';

export const REFIER_OPEN_COMMUNITY = 'REFIER_OPEN_COMMUNITY'
export const REFIER_OPEN_COMMUNITY_NICKNAME = 'REFIER'

export var getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export var getCSRFHeader = () => {
    return {
        headers: {
            "X-CSRFTOKEN": getCookie('csrftoken'),
            "X-REQUESTED-WITH": "XMLHttpRequest"
        }
    }
}



export const COMMUNITY_LABEL = {
    community_type: ["school", "ngo", "colleges", "institutions"],
    "school": {
        teacher: "Teacher",
        teachers: "Teachers",
        student: "Student",
        students: "Students",
        internal_counsellors: "School Counsellors"
    },

    "ngo": {
        teacher: "Volunteer",
        teachers: "Volunteers",
        student: "Student",
        students: "Students",
        internal_counsellors: "NGO Counsellors"
    },

    "college": {
        teacher: "Faculty",
        teachers: "Faculties",
        student: "Student",
        students: "Students",
        internal_counsellors: "College Counsellors"
    },

    "institutions": {
        teacher: "Faculty",
        teachers: "Faculties",
        student: "Student",
        students: "Students",
        internal_counsellors: "Institute Counsellors"
    },
    "corporate": {
        teacher: "Facilitator",
        teachers: "Facilitators",
        student: "Employee",
        students: "Employees",
        internal_counsellors: "Company Counsellors"
    },
    "community": {
        teacher: "Facilitator",
        teachers: "Facilitators",
        student: "User",
        students: "Users",
        internal_counsellors: "Counsellors"
    },
    "training": {
        teacher: "Trainer",
        teachers: "Trainers",
        student: "Learner",
        students: "Learners",
        internal_counsellors: "Master Trainers"
    }



}


export function isMobileDevice() {
    if (window.screen.availWidth < 420) {
        return true;
    }
    return false;
}

export function isXsDevice() {
    if (window.screen.availWidth >= 420 && window.screen.availWidth < 768) {
        return true;
    }
    return false;
}

export function isSmDevice() {
    if (window.screen.availWidth >= 768 && window.screen.availWidth < 992) {
        return true;
    }
    return false;
}

export function isMdDevice() {
    if (window.screen.availWidth >= 992 && window.screen.availWidth < 1200) {
        return true;
    }
    return false;
}

export function isLgDevice() {
    if (window.screen.availWidth >= 1200) {
        return true;
    }
    return false;
}

export function getCommunityLabel(communityType) {
    if ("school" === communityType.toLowerCase()) {
        return COMMUNITY_LABEL.school
    } else if ("ngo" === communityType.toLowerCase()) {
        return COMMUNITY_LABEL.ngo
    } else if ("college" === communityType.toLowerCase()) {
        return COMMUNITY_LABEL.college
    } else if ("institute" === communityType.toLowerCase()) {
        return COMMUNITY_LABEL.institutions
    } else if ("corporate" === communityType.toLowerCase()) {
        return COMMUNITY_LABEL.corporate
    } else if ("training" === communityType.toLowerCase()) {
        return COMMUNITY_LABEL.training
    } else if ("community" === communityType.toLowerCase()) {
        return COMMUNITY_LABEL.community
    } else {
        return COMMUNITY_LABEL.community
    }
}

export const SUPPORTED_BROWSER_WEBINAR = {
    "Operating System": [
        "Windows7-Windows10",
        "Mac OS X 10.9 (Mavericks) - macOS Mojave (10.14)",
        "Linux",
        "Google Chrome OS",
        "Android OS 5 (Lollipop) - Android 9 (Pie)",
        "iOS 10 - iOS 11",
        "Windows Phone 8+, Windows 8RT+"],
    "Web browser": [
        "Google Chrome v57 or later",
        "Mozilla Firefox v52 or later",
        "Internet Explorer v10 or later",
        "Microsoft Edge v12 or later",
        "Apple Safari v10 or later"
    ],
    "Internet Connection": [
        "Computer: 1 Mbps or better (broadband recommended)",
        "Mobile device: 3G or better (WiFi recommended)"
    ],
    "Hardware": [
        "2GB of RAM (minimum), 4GB or more of RAM (recommended)",
        "Microphone and speakers (USB headset recommended)",
        "Webcam for HD Faces"
    ]
}

let isPlaying=false;
let isNotificationMuted = false;
export function toggleNotification(){
    isNotificationMuted = !isNotificationMuted
}


export async function playNotificationSound(){
    if(isNotificationMuted){
        return;
    }
    if (isPlaying){
        return
    }
    try {
        isPlaying = true;
        await audio.play();
        isPlaying = false;
    }catch(err) {
        isPlaying = false;
    }
}

export const INDUSTRY_NAMES = [
    'AGRICULTURE AND ALLIED INDUSTRIES',
    'AUTOMOBILES',
    'AUTO COMPONENTS',
    'AVIATION',
    'BANKING',
    'CONSUMER DURABLES',
    'ECOMMERCE',
    'EDUCATION AND TRAINING',
    'ENGINEERING AND CAPITAL GOODS',
    'FINANCIAL SERVICES',
    'FMCG',
    'GEMS AND JEWELLERY',
    'HEALTHCARE',
    'INFRASTRUCTURE',
    'INSURANCE',
    'IT & ITES',
    'MANUFACTURING',
    'MEDIA AND ENTERTAINMENT',
    'METALS AND MINING',
    'OIL AND GAS',
    'PHARMACEUTICALS',
    'PORTS',
    'POWER',
    'RAILWAYS',
    'REAL ESTATE',
    'RENEWABLE ENERGY',
    'RETAIL',
    'SCIENCE AND TECHNOLOGY',
    'SERVICES',
    'TELECOMMUNICATIONS',
    'TOURISM AND HOSPITALITY',
]

export const JOB_DESIGNATIONS = [
    'Account Manager',
    'Account Services Executive',
    'Accountant',
    'Accounts Assistant/ Book Keeper',
    'Accounts Head/ GM - Accounts',
    'Actuary',
    'Admin - Executive',
    'Admin - Head/ Manager',
    'Advertising - Executive',
    'Advertising - Manager',
    'Advisory',
    'Air Hostess/ Steward/ Cabin Crew',
    'Alliances Manager',
    'Anaesthetist',
    'Analytical Chemistry Scientist',
    'Appraisals - Head/ Mgr',
    'Architect',
    'Area Manager',
    'Asset Operations',
    'Attendant',
    'Audit',
    'AV Executive',
    'Aviation Engineer',
    'Ayurvedic Doctor',
    'Banquet Manager',
    'Banquet Sales',
    'Bartender',
    'Basic Research Scientist',
    'Bio-chemist',
    'Bio-Technology Research Scientist',
    'Branch Head',
    'Brand Manager/ Product Manager',
    'Business Analyst',
    'Business Center Manager',
    'Business Editor',
    'Business Writer',
    'Business/ Strategic Planning - Manager',
    'Cameraman',
    'Cash Management Operations',
    'Cash Officer/ Manager',
    'Cashier',
    'CEO/MD/ Country Manager',
    'Chartered Accountant/ CPA',
    'Chef/ Kitchen Manager',
    'Chemical Engineer',
    'Chemical Research Scientist',
    'Chemist',
    'Chief Chef',
    'Chief Engineer',
    'Chief/ Deputy Chief of Bureau',
    'Choreographer',
    'Civil Engineer',
    'Claims Adjuster',
    'Clerks',
    'Clearing Officer/ Head',
    'Clinical Research Scientist',
    'Club Floor Manager',
    'Collections',
    'Commercial - Manager',
    'Company Secretary',
    'Compliance & Control',
    'Computer Operator/ Data Entry',
    'Concierge',
    'Configuration Mgr/ Release Manager',
    'Construction Suptd/ Inspector',
    'Consultant',
    'Consumer Banking Asset Operations',
    'Consumer Banking Branch Head',
    'Consumer Banking Credit Analyst',
    'Consumer Banking Credit Head',
    'Consumer Banking Customer Service',
    'Consumer Banking Head',
    'Consumer Banking Region Head',
    'Consumer Branch Banking Operations',
    'Copy Writer',
    'Copy/ Sub Editor',
    'Corp Communications - Head',
    'Corp Communications - Manager/ Executive',
    'Corporate Banking Branch Head',
    'Corporate Banking Credit Analyst',
    'Corporate Banking Credit Control Manager',
    'Corporate Banking Credit Head',
    'Corporate Banking Customer Support Manager',
    'Corporate Banking Head',
    'Corporate Banking Region Head',
    'Correspondent/ Reporter',
    'Cost Accountant',
    'Country Network Coordinator',
    'Creative Director',
    'Credit Control & Collections',
    'Customer Care Executive',
    'Customer Service Executive (Voice)',
    'Customer Service Executive (Web)',
    'Customer Service/ Tech Support',
    'Customer Support Engineer/ Technician',
    'Data Management/ Statistics',
    'Database Administrator (DBA)',
    'Database Architect/ Designer',
    'Datawarehousing Consultants',
    'Depository Participant',
    'Derivatives Analyst',
    'Design Manager/ Engineer',
    'Despatch Incharge',
    'Dietician',
    'Direct Marketing - Executive',
    'Direct Marketing - Manager',
    'Director on Board',
    'Director/ Practice Head (PR)',
    'Distribution - Head',
    'Doctor',
    'Documentation & VISA',
    'Documentation/ Medical Writing',
    'Documentation/ Shipment Management',
    'Domestic Travel',
    'Drug Regulatory Doctor',
    'ECG/ CGA Technician',
    'Editor/ Managing Editor',
    'EDP Analyst',
    'Electrical Engineer',
    'Electronics/ Instrumentation Engineer',
    'Entrepreneur',
    'Environmental Engineer',
    'ERP, CRM - Functional Consultant',
    'ERP, CRM - Technical Consultant',
    'ERP/ CRM - Support Engineer',
    'Events/ Promotions Manager',
    'Express Centre - Executive',
    'Express Centre - Head/ Manager',
    'External Auditor',
    'External Consultant',
    'F&B Manager',
    'Fashion Designer',
    'Features Editor',
    'Features Writer',
    'Finance Assistant',
    'Finance Head/ GM - Finance',
    'Finance Manager',
    'Financial Analyst',
    'Financial Controller',
    'Financial Planning, Budgeting - Manager',
    'Fitness Trainer',
    'Fixed Income - Head/ Mgr (Treasury)',
    'Fleet Supervisor',
    'Foreign Exchange Officer',
    'Foreman',
    'FOREX - Head/ Mgr (Treasury)',
    'FOREX Dealer',
    'Franchisee Coordinator',
    'Freelancer',
    'Fresher',
    'Front Desk',
    'Front Office',
    'Front Office Manager',
    'GM',
    'GM - Risks',
    'GM - Treasury',
    'GM/ DGM',
    'Goods Manufacturing Practices (GMP)',
    'Graphic Designer/ Animator',
    'Ground Staff',
    'Group Account Mgr/ Account Director',
    'Group Head - Creative',
    'GSM Engineer',
    'Guest Relations Executive',
    'Guest Relations Manager',
    'H/W Installation/ Maintenance Engg',
    'Hardware Design Engineer',
    'Hardware Design Technical Leader',
    'Head/ Manager - BPO',
    'Health Club Manager',
    'Hearing Aid Technician',
    'Hedge Fund Analyst/Trader',
    'Hostess/ Host',
    'House Keeping',
    'House Keeping - Head/ Manager',
    'House Keeping Executive',
    'HR Executive',
    'ICWA',
    'Industrial Engineering',
    'Industrial Relations Manager',
    'Information Systems (MIS) - Manager',
    'Instructional Designer',
    'Interior Designer',
    'Internal Auditor',
    'International Business Dev Mgr',
    'International Travel',
    'Internet Banking',
    'Inventory Control Manager/ Materials Manager',
    'Investment Advisor',
    'IT/ Networking (EDP) - Manager',
    'Journalist',
    'Lab Staff',
    'Lab Technician',
    'Laundry Manager',
    'Law Officer',
    'Lawyer/ Attorney',
    'Legal - Head',
    'Legal Advisor',
    'Legal Assistant/ Apprentice',
    'Legal Consultant/ Solicitor',
    'Legal Services - Manager',
    'Liaison',
    'Librarian',
    'Lobby/ Duty Manager',
    'Logistics - Co-ordinator',
    'Logistics - Head/ Mgr',
    'Loyalty Program',    
    'M & A Advisor',
    'Maintenance',
    'Maintenance Engineer',
    'Maintenance Technician',
    'Market Research - Executive',
    'Market Research - Field Executive',
    'Market Research - Field Supervisor/ Field',
    'Market Research - Manager',
    'Market Research Exec - Qualitative',
    'Market Research Exec - Quantitative',
    'Market Research Manager',
    'Market Risk - Head/ Mgr',
    'Marketing Manager',
    'Masseur',
    'Materials - Head/ GM',
    'Mechanical Engineer',
    'Media Buying - Manager/ Executive',
    'Media Planning - Manager/ Executive',
    'Media Relations & Research - Manager',
    'Medical Officer',
    'Medical Representative',
    'Medical Transcription Executive',
    'Merchandiser',
    'Microbiologist',
    'Migrations/ Transitions',
    'Mines Engineer',
    'Model',
    'Money Market Dealer',
    'Mutual Fund Analyst',
    'Nephrologist',
    'Network Administrator',
    'Network Installation & Administration Engineer',
    'Network Planning - Chief Engineer',
    'Network Planning - Engineer',
    'News Editor',
    'Nurse',
    'Nutritionist',
    'O&M Engineer',
    'Occupational Therapist',
    'Office Assistant',
    'Operation Theater Technician',
    'Operations - Manager',
    'Ophthalmologist',
    'Optometrist',
    'Orthopaedist',
    'Other Advertising/ PR/ MR',
    'Other Banking',
    'Other Customer Service/ Call Center',
    'Other Distribution/Delivery',
    'Other Export/ Import',
    'Other Financial Services',
    'Other Health Care/ Hospitals',
    'Other Hotels/ Restaurants',
    'Other Legal/ Law',
    'Other Marketing',
    'Other Media/ Journalism',
    'Other Pharma',
    'Other Purchase/ Supply Chain',
    'Other Retail Chains/Shops',
    'Other Telecom/ISP',
    'Other Travel/ Airlines',
    'Outside Service Providers',
    'Paint Shop',
    'Painter',
    'Pathologist',
    'Payroll/ Compensation - Head/ Mgr',
    'Perfusionist',
    'Personal Assistant to CEO',
    'Pharmaceutical Research Scientist',
    'Pharmacist',
    'Phone Banking',
    'Photographer',
    'Physician',
    'Physiotherapist',
    'Pilot',
    'Plant Head/ Factory Manager',
    'POD Assistant',
    'POD Incharge',
    'Policy Administration',
    'Political Editor',
    'Political Writer',
    'Portfolio Manager',
    'Postdoc Position/Fellowship',
    'Practical Training/Internship',
    'Press Shop',
    'Principal/ Senior Correspondent',
    'Printing Technologist/ Manager',
    'Private Banker',
    'Private Practitioner/ Lawyer',
    'Process Manager/ Engineer',
    'Producer/ Production Manager',
    'Product Manager',
    'Production Manager/ Engineer',
    'Program Manager',
    'Project Finance - Head/ Mgr',
    'Project Finance Advisor',
    'Project Leader/ Project Manager',
    'Property Management',
    'Psychiatrist',
    'Psychologist',
    'Public Relations - Executive',
    'Public Relations - Manager',
    'Purchase - Head',
    'Purchase Manager',
    'Purchase Officer/ Co-ordinator/ Executive',
    'Quality Assurance - Manager',
    'Quality Assurance Executive',
    'Quality Assurance/ Control',
    'R & D - Head/ Manager',
    'Radiographer',
    'Radiologist',
    'Ratings Analyst',
    'Real Estate Assessor',
    'Real Estate Broker',
    'Receptionist/ Front Office Executive',
    'Recruitment - Head/ Mgr',
    'Regional Manager',
    'Regional Mgr/ Manager(Operations)',
    'Relationship Mgr/ Account Servicing',
    'Research Assistant',
    'Research Scientist',
    'Reservation Manager',
    'Resident Editor',
    'Restaurant Manager',
    'Retail Store Manager',
    'RF Installation & Administration Engineer',
    'RF Planning - Chief Engineer',
    'RF Planning Engineer',
    'Risk Manager',
    'Room Service Manager',
    'S/W Installation/ Maintenance Engg',
    'Safety Officer/ Engineer',
    'Sales Exec/ Sales Representative',
    'SBU Head /Profit Centre Head',
    'Script Writer',
    'Secretary',
    'Security Analyst',
    'Security Manager/ Officer',
    'Security Officer',
    'Service Manager/ Engineer',
    'Shares Services Executive',
    'Shift Engineer/ Supervisor',
    'Shift Manager',
    'Shift Supervisor',
    'Shift Supervisor',
    'Software Engineer/ Programmer',
    'Software Test Engineer',
    'Spares Manager/ Engineer',
    'Specialist - Medicine',
    'Steward/ Waiter',
    'Stock Broker',
    'Store Keeper/ Warehouse Assistant',
    'Supply Chain - Head',
    'Surgeon',
    'Switching - Chief Engineer',
    'Switching - Engineer',
    'System Administrator',
    'System Analyst/ Tech Architect',
    'System Engineer',
    'System Integrator',
    'System Security - Chief Engineer',
    'System Security - Engineer',
    'Taxation - Manager',
    'Teacher/ Professor',
    'Team Leader',
    'Team Leader/ Technical Leader',
    'Tech/ Engg - Manager',
    'Technical - Manager',
    'Technical Support Engineer',
    'Technical Support Executive',
    'Technical Writer',
    'Technician',
    'Technology Transfer Engineer',
    'Telesales/ Telemarketing Executive',
    'Tool Room',
    'Trade Finance/ Cash Mgmt Services - Head/ Mgr',
    'Trading',
    'Trading Advisor',
    'Traffic Clerk',
    'Traffic Clerk',
    'Trainee',
    'Trainee/ Management Trainee',
    'Trainer/ Faculty',
    'Training & Development - Head/ Mgr',
    'Training Manager',
    'Training Managers/ Trainers',
    'Transactions Processing Executive',
    'Transit Centre (Air) - Executive',
    'Transit Centre (Air) - Head/ Manager',
    'Transit Centre (Rail) - Executive',
    'Transit Centre (Rail) - Head/ Manager',
    'Transit Centre (Road) - Executive',
    'Transit Centre (Road) - Head/ Manager',
    'Transportation/ Shipping Supervisor',
    'Travel Agent/ Tour Operator',
    'Treasury Manager',
    'Treasury Marketing Fixed Income',
    'Treasury Marketing FOREX',
    'TV Anchor',
    'Typist',
    'Underwriter',
    'Vendor Development Manager',
    'Vendor Development Manager',
    'Visualiser',
    'VP - Client Servicing (Advertising)',
    'VP - Client/ Servicing (MR)',
    'VP - Creative/ Creative Director',
    'VP - Finance/ CFO',
    'VP - Media Buying',
    'VP - Media Planning & Strategy',
    'VP - Operations/ COO',
    'VP/ GM - Administration',
    'VP/ GM - Commercial',
    'VP/ GM - Engg/ Production',
    'VP/ GM - HR',
    'VP/ GM - Quality',
    'VP/ GM R&D (Pharma)',
    'VP/ GM/ Head - Marketing',
    'VP/ Head - Customer Service',
    'VP/ Head - Technology (Telecom/ ISP)',
    'Web Designer',
    'Web Master/ Web Site Manager',
    'Weld Shop',
    'Work Flow Analyst',
    'Work Flow Analyst',
]

export const ACADEMIC_DISCIPLINE = [
    'Bachelor of Architecture - B.Arch',
    'Bachelor of Arts - B.A.',
    'Bachelor of Ayurvedic Medicine & Surgery - B.A.M.S.    ',
    'Bachelor of Business Administration - B.B.A.',
    'Bachelor of Commerce - B.Com.',
    'Bachelor of Computer Applications - B.C.A.',
    'Bachelor of Dental Surgery - B.D.S.',
    'Bachelor of Design - B.Des. / B.D.',
    'Bachelor of Education - B.Ed.',
    'Bachelor of Engineering / Bachelor of Technology - B.E./B.Tech.',
    'Bachelor of Fine Arts - BFA / BVA',
    'Bachelor of Fisheries Science - B.F.Sc./ B.Sc. (Fisheries).',
    'Bachelor of Homoeopathic Medicine and Surgery - B.H.M.S.',
    'Bachelor of Laws - L.L.B.',
    'Bachelor of Library Science - B.Lib. / B.Lib.Sc.',
    'Bachelor of Mass Communications - B.M.C. / B.M.M.',
    'Bachelor of Medicine and Bachelor of Surgery - M.B.B.S.',
    'Bachelor of Nursing',
    'Bachelor of Pharmacy - B.Pharm / B.Pharma.',
    'Bachelor of Physical Education - B.P.Ed.',
    'Bachelor of Physiotherapy - B.P.T.',
    'Bachelor of Science - B.Sc.',
    'Bachelor of Social Work - BSW / B.A. (SW)',
    'Bachelor of Veterinary Science & Animal Husbandry - B.V.Sc. & A.H. / B.V.Sc',
    'Doctor of Medicine - M.D.',
    'Doctor of Medicine in Homoeopathy - M.D. (Homoeopathy)',
    'Doctor of Pharmacy - Pharm.D    ',
    'Doctor of Philosophy - Ph.D.',
    'Doctorate of Medicine - D.M.',
    'Master of Architecture - M.Arch.',
    'Master of Arts - M.A.',
    'Master of Business Administration - M.B.A.',
    'Master of Chirurgiae - M.Ch.',
    'Master of Commerce - M.Com.',
    'Master of Computer Applications - M.C.A.',
    'Master of Dental Surgery - M.D.S.',
    'Master of Design - M.Des./ M.Design.',
    'Master of Education - M.Ed.',
    'Master of Engineering / Master of Technology - M.E./ M.Tech.',
    'Master of Fine Arts - MFA / MVA',
    'Master of Laws - L.L.M.',
    'Master of Library Science - M.Lib./ M.Lib.Sc.',
    'Master of Mass Communications / Mass Media - M.M.C / M.M.M.',
    'Master of Pharmacy - M.Pharm',
    'Master of Philosophy - M.Phil.',
    'Master of Physical Education M.P.Ed. / M.P.E.',
    'Master of Physiotherapy - M.P.T.',
    'Master of Science - M.Sc.',
    'Master of Social Work / Master of Arts in Social Work - M.S.W. / M.A. (SW)',
    'Master of Science in Agriculture - M.Sc. (Agriculture)',
    'Master of Surgery - M.S.',
    'Master of Veterinary Science - M.V.Sc.',
]