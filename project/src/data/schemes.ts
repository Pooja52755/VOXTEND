import { WelfareScheme } from '../types';

export const welfareSchemes: WelfareScheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    description: 'Direct income support scheme for farmers providing ₹6,000 per year in three installments',
    category: 'Agriculture',
    targetGroup: 'Small and marginal farmers with landholding up to 2 hectares',
    eligibilityDetails: [
      'Small and marginal farmer families',
      'Landholding up to 2 hectares',
      'Name in land records',
      'Aadhaar mandatory'
    ],
    benefits: '₹6,000 per year (₹2,000 every 4 months)',
    documents: [
        { name: 'Aadhaar Card', url: '/documents/aadhar_card.png' },
        { name: 'PAN Card', url: '/documents/pan_card.png' },
        { name: 'Income Certificate', url: '/documents/income_certificate.png' },
    ],
    howToApply: [
      'Visit PM-KISAN portal or CSC center',
      'Fill application form with personal details',
      'Upload required documents',
      'Submit and get registration number'
    ],
    contact: { name: 'PM-KISAN Helpdesk', number: '155261', email: 'pmkisan-ict@gov.in' },
    keywords: ['farmer', 'agriculture', 'income support', 'pm kisan', 'kisan samman']
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    description: 'Health insurance scheme providing free treatment up to ₹5 lakh per family per year',
    category: 'Healthcare',
    targetGroup: 'Poor and vulnerable families as per SECC 2011 database',
    eligibilityDetails: [
      'Families listed in SECC 2011',
      'Automatic eligibility for eligible families',
      'No premium payment required',
      'Covers both rural and urban families'
    ],
    benefits: 'Health coverage up to ₹5 lakh per family per year',
    documents: [
        { name: 'Aadhaar Card', url: '/documents/aadhar_card.png' },
        { name: 'PAN Card', url: '/documents/pan_card.png' },
    ],
    howToApply: [
      'Check eligibility on official website',
      'Visit empaneled hospital',
      'Get Golden Card issued',
      'Avail cashless treatment'
    ],
    contact: { name: 'Ayushman Bharat Helpdesk', number: '14555', email: 'support@pmjay.gov.in' },
    keywords: ['health', 'insurance', 'ayushman', 'medical', 'treatment', 'hospital']
  },
  {
    id: 'ujjwala',
    name: 'Pradhan Mantri Ujjwala Yojana (PMUY)',
    description: 'LPG connection scheme for women from BPL households',
    category: 'Energy',
    targetGroup: 'Women from Below Poverty Line (BPL) families',
    eligibilityDetails: [
      'Woman should be above 18 years',
      'BPL family member',
      'No LPG connection in household',
      'Bank account in woman\'s name'
    ],
    benefits: 'Free LPG connection with deposit-free cylinder and regulator',
    documents: [
        { name: 'Aadhaar Card', url: '/documents/aadhar_card.png' },
        { name: 'Caste Certificate', url: '/documents/caste_certificate.png' },
    ],
    howToApply: [
      'Visit nearest LPG distributor',
      'Fill PMUY application form',
      'Submit required documents',
      'Get connection within 10-15 days'
    ],
    contact: { name: 'Ujjwala Yojana Helpline', number: '1906', email: 'support@pmuy.gov.in' },
    keywords: ['lpg', 'gas', 'ujjwala', 'cooking', 'women', 'connection']
  },
  {
    id: 'swachh-bharat',
    name: 'Swachh Bharat Mission - Gramin (SBM-G)',
    description: 'Rural sanitation programme providing toilet construction incentives',
    category: 'Sanitation',
    targetGroup: 'Rural households without toilets',
    eligibilityDetails: [
      'Rural household without toilet',
      'Family name in gram panchayat list',
      'Not beneficiary of previous toilet schemes',
      'Willing to contribute for construction'
    ],
    benefits: '₹12,000 incentive for toilet construction',
    documents: [
        { name: 'Aadhaar Card', url: '/documents/aadhar_card.png' },
    ],
    howToApply: [
      'Apply through Gram Panchayat',
      'Get name included in beneficiary list',
      'Construct toilet as per guidelines',
      'Get verification and receive incentive'
    ],
    contact: { name: 'Swachh Bharat Mission', email: 'support@sbm.gov.in' },
    keywords: ['toilet', 'sanitation', 'swachh bharat', 'hygiene', 'rural']
  },
  {
    id: 'pmay-gramin',
    name: 'Pradhan Mantri Awaas Yojana - Gramin (PMAY-G)',
    description: 'Housing scheme for rural poor providing assistance for house construction',
    category: 'Housing',
    targetGroup: 'Rural poor households without a pucca house',
    eligibilityDetails: [
      'Houseless or living in kutcha house',
      'Family should not own a pucca house',
      'Selection based on SECC 2011 data',
      'Land ownership or government allotment'
    ],
    benefits: 'Financial assistance for house construction up to ₹1.2 lakh (plains) / ₹1.3 lakh (hilly areas)',
    documents: [
        { name: 'Aadhaar Card', url: '/documents/aadhar_card.png' },
        { name: 'Income Certificate', url: '/documents/income_certificate.png' },
    ],
    howToApply: [
      'Registration through Gram Sabha',
      'Verification of beneficiaries',
      'Construction in phases',
      'Payment in installments on completion'
    ],
    contact: { name: 'PMAY-G Helpdesk', email: 'support@pmayg.nic.in' },
    keywords: ['house', 'housing', 'pmay', 'construction', 'rural', 'shelter']
  },
  {
    id: 'jandhan',
    name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
    description: 'Financial inclusion scheme for zero balance bank accounts',
    category: 'Financial Inclusion',
    targetGroup: 'All unbanked citizens',
    eligibilityDetails: [
      'Indian citizen',
      'Age above 10 years',
      'No other bank account',
      'Simplified KYC process'
    ],
    benefits: 'Zero balance account, RuPay debit card, accident insurance cover of ₹1 lakh',
    documents: [
        { name: 'Aadhaar Card', url: '/documents/aadhar_card.png' },
        { name: 'PAN Card', url: '/documents/pan_card.png' },
    ],
    howToApply: [
      'Visit nearest bank branch or Bank Mitra',
      'Fill account opening form',
      'Submit identity and address proof',
      'Get account opened immediately'
    ],
    contact: { name: 'Jan Dhan Yojana Helpdesk', email: 'support@pmjdy.gov.in' },
    keywords: ['bank account', 'jan dhan', 'financial inclusion', 'zero balance', 'insurance']
  },
  {
    id: 'pension-scheme',
    name: 'Pradhan Mantri Shram Yogi Maan-dhan (PM-SYM)',
    description: 'Pension scheme for unorganized workers with monthly pension of ₹3,000',
    category: 'Social Security',
    targetGroup: 'Unorganized workers aged 18-40 years',
    eligibilityDetails: [
      'Age between 18-40 years',
      'Monthly income ≤ ₹15,000',
      'Not covered under EPF/ESIC/NPS',
      'Aadhaar and bank account mandatory'
    ],
    benefits: 'Monthly pension of ₹3,000 after 60 years',
    documents: [
        { name: 'Aadhaar Card', url: '/documents/aadhar_card.png' },
        { name: 'Income Certificate', url: '/documents/income_certificate.png' },
    ],
    howToApply: [
      'Visit CSC center',
      'Fill enrollment form',
      'Make first contribution',
      'Get scheme acknowledgment'
    ],
    contact: { name: 'Maan-dhan Helpdesk', number: '14434', email: 'support@maandhan.in' },
    keywords: ['pension', 'retirement', 'shram yogi', 'unorganized worker', 'old age']
  },
  {
    id: 'scholarship',
    name: 'Post Matric Scholarship for SC/ST/OBC',
    description: 'Educational scholarship for students from SC/ST/OBC communities',
    category: 'Education',
    targetGroup: 'SC/ST/OBC students pursuing post-matric education',
    eligibilityDetails: [
      'Student from SC/ST/OBC category',
      'Family income limits as per category',
      'Enrolled in recognized institution',
      'Not beneficiary of other scholarships'
    ],
    benefits: 'Tuition fees, maintenance allowance, and other educational expenses',
    documents: [
        { name: 'Aadhaar Card', url: '/documents/aadhar_card.png' },
        { name: 'Caste Certificate', url: '/documents/caste_certificate.png' },
        { name: 'Income Certificate', url: '/documents/income_certificate.png' },
        { name: 'Educational Certificates', url: '/documents/educational_certificates.png' },
    ],
    howToApply: [
      'Apply online on National Scholarship Portal',
      'Fill personal and academic details',
      'Upload required documents',
      'Submit application before deadline'
    ],
    contact: { name: 'National Scholarship Portal', email: 'helpdesk@nsp.gov.in' },
    keywords: ['scholarship', 'education', 'student', 'sc st obc', 'study', 'fees']
  },
  {
    id: 'mudra-loan',
    name: 'Pradhan Mantri MUDRA Yojana',
    description: 'Micro-finance scheme for small businesses and entrepreneurs',
    category: 'Business',
    targetGroup: 'Micro, small entrepreneurs and business persons',
    eligibilityDetails: [
      'Indian citizen',
      'Business plan for non-agricultural activities',
      'No existing loan default',
      'Age 18 years and above'
    ],
    benefits: 'Loans up to ₹10 lakh without collateral',
    documents: [
        { name: 'Aadhaar Card', url: '/documents/aadhar_card.png' },
        { name: 'PAN Card', url: '/documents/pan_card.png' },
    ],
    howToApply: [
      'Prepare business plan',
      'Visit bank or NBFC',
      'Submit loan application with documents',
      'Get loan approval and disbursement'
    ],
    contact: { name: 'MUDRA Helpdesk', email: 'support@mudra.org.in' },
    keywords: ['loan', 'business', 'mudra', 'entrepreneur', 'micro finance', 'startup']
  },
  {
    id: 'maternity-benefit',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    description: 'Maternity benefit scheme providing cash incentive to pregnant and lactating women',
    category: 'Women & Child',
    targetGroup: 'Pregnant and lactating women (first living child)',
    eligibilityDetails: [
      'Pregnant and lactating women',
      'First living child',
      'Age 19 years and above',
      'Not receiving similar benefits under other schemes'
    ],
    benefits: '₹5,000 in three installments during pregnancy and after delivery',
    documents: [
        { name: 'Aadhaar Card', url: '/documents/aadhar_card.png' },
    ],
    howToApply: [
      'Register at Anganwadi Center/Health facility',
      'Get antenatal check-ups as scheduled',
      'Fulfill conditions for each installment',
      'Receive direct benefit transfer in bank account'
    ],
    contact: { name: 'PMMVY Helpdesk', email: 'support@pmmvy.gov.in' },
    keywords: ['maternity', 'pregnancy', 'women', 'child', 'mother', 'delivery', 'cash benefit']
  }
];