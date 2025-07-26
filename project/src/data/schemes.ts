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
      'Aadhaar Card',
      'Bank Account Details',
      'Land Records (Khata/Khesra)',
      'Citizenship Certificate'
    ],
    applicationProcess: [
      'Visit PM-KISAN portal or CSC center',
      'Fill application form with personal details',
      'Upload required documents',
      'Submit and get registration number'
    ],
    contactInfo: 'Helpline: 155261 | Website: pmkisan.gov.in',
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
      'Aadhaar Card',
      'Ration Card',
      'Mobile Number',
      'Family ID (if available)'
    ],
    applicationProcess: [
      'Check eligibility on official website',
      'Visit empaneled hospital',
      'Get Golden Card issued',
      'Avail cashless treatment'
    ],
    contactInfo: 'Toll-free: 14555 | Website: pmjay.gov.in',
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
      'BPL Ration Card',
      'Aadhaar Card of woman',
      'Bank Account Details',
      'Photo of applicant',
      'Address Proof'
    ],
    applicationProcess: [
      'Visit nearest LPG distributor',
      'Fill PMUY application form',
      'Submit required documents',
      'Get connection within 10-15 days'
    ],
    contactInfo: 'Helpline: 1906 | Website: pmuy.gov.in',
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
      'Aadhaar Card',
      'Bank Account Details',
      'Photo of house',
      'Certificate from Gram Panchayat'
    ],
    applicationProcess: [
      'Apply through Gram Panchayat',
      'Get name included in beneficiary list',
      'Construct toilet as per guidelines',
      'Get verification and receive incentive'
    ],
    contactInfo: 'Website: swachhbharatmission.gov.in',
    keywords: ['toilet', 'sanitation', 'swachh bharat', 'hygiene', 'rural']
  },
  {
    id: 'pmay-gramin',
    name: 'Pradhan Mantri Awaas Yojana - Gramin (PMAY-G)',
    description: 'Housing scheme for rural poor providing assistance for house construction',
    category: 'Housing',
    targetGroup: 'Homeless and houseless families in rural areas',
    eligibilityDetails: [
      'Families in SECC 2011 list',
      'No pucca house owned',
      'No family member in government job',
      'Annual income criteria as per guidelines'
    ],
    benefits: '₹1.20 lakh in plains, ₹1.30 lakh in hilly states',
    documents: [
      'Aadhaar Card',
      'Bank Account Details',
      'Income Certificate',
      'Land Documents',
      'Caste Certificate (if applicable)'
    ],
    applicationProcess: [
      'Apply through Gram Panchayat',
      'Technical sanction from Block office',
      'Construction in phases',
      'Payment in installments on completion'
    ],
    contactInfo: 'Website: pmayg.nic.in',
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
      'Age 10 years and above',
      'No existing bank account',
      'Valid identity proof'
    ],
    benefits: 'Zero balance account, RuPay debit card, insurance coverage',
    documents: [
      'Aadhaar Card (preferred)',
      'Voter ID Card',
      'Driving License',
      'NREGA Job Card',
      'Passport size photo'
    ],
    applicationProcess: [
      'Visit nearest bank branch',
      'Fill account opening form',
      'Submit identity and address proof',
      'Get account opened immediately'
    ],
    contactInfo: 'Website: pmjdy.gov.in',
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
      'Aadhaar Card',
      'Bank Account Details',
      'Mobile Number',
      'Income Proof'
    ],
    applicationProcess: [
      'Visit CSC center',
      'Fill enrollment form',
      'Make first contribution',
      'Get scheme acknowledgment'
    ],
    contactInfo: 'Helpline: 14434 | Website: maandhan.in',
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
      'Caste Certificate',
      'Income Certificate',
      'Admission Certificate',
      'Aadhaar Card',
      'Bank Account Details',
      'Previous year marksheet'
    ],
    applicationProcess: [
      'Apply online on National Scholarship Portal',
      'Fill personal and academic details',
      'Upload required documents',
      'Submit application before deadline'
    ],
    contactInfo: 'Website: scholarships.gov.in',
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
      'Aadhaar Card',
      'PAN Card',
      'Business Plan',
      'Bank Statements',
      'Income Proof',
      'Business Registration (if any)'
    ],
    applicationProcess: [
      'Prepare business plan',
      'Visit bank or NBFC',
      'Submit loan application with documents',
      'Get loan approval and disbursement'
    ],
    contactInfo: 'Website: mudra.org.in',
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
      'Aadhaar Card',
      'MCP Card (Mother and Child Protection)',
      'Bank Account Details',
      'JSY Card (if available)'
    ],
    applicationProcess: [
      'Register at Anganwadi Center/Health facility',
      'Get antenatal check-ups as scheduled',
      'Fulfill conditions for each installment',
      'Receive direct benefit transfer in bank account'
    ],
    contactInfo: 'Website: pmmvy.gov.in',
    keywords: ['maternity', 'pregnancy', 'women', 'child', 'mother', 'delivery', 'cash benefit']
  }
];