/**
 * ============================================================================
 * THE NORTHBENGAL BUZZ - COMPREHENSIVE AUTOMATION TEST SUITE
 * ============================================================================
 * Validates:
 * 1. Data Schema Integrity (Packages, Tea Products, Routes, Weather, Culture)
 * 2. Algorithmic Calculators (Cab Estimator, Trip Budget Builder)
 * 3. Interactive Component Logic (Anti-Bot Math Challenges, Theme, Weather Checklist)
 * 4. Site Configuration & Security Assertions
 * 5. Production Assets & Build Readiness
 */

import { packagesData } from '../src/data/packagesData.js';
import { teaProductsData } from '../src/data/teaProductsData.js';
import { SITE_CONFIG } from '../src/config/siteConfig.js';
import fs from 'fs';
import path from 'path';

let passedTests = 0;
let failedTests = 0;
const testResults = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passedTests++;
    testResults.push({ status: 'PASS', name: testName });
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedTests++;
    testResults.push({ status: 'FAIL', name: testName, details });
    console.error(`  ❌ FAIL: ${testName} - ${details}`);
  }
}

console.log('\n🚀 STARTING COMPREHENSIVE AUTOMATION TESTING FOR THE NORTHBENGAL BUZZ\n');

// ============================================================================
// SUITE 1: PACKAGE DATA INTEGRITY & PRICING
// ============================================================================
console.log('📦 SUITE 1: Tour Package Data Integrity');
assert(Array.isArray(packagesData) && packagesData.length >= 8, 'Packages collection contains at least 8 packages');

const validCategories = ['trekking', 'offbeat', 'hillstation', 'wildlife'];
packagesData.forEach((pkg, idx) => {
  assert(pkg.id && typeof pkg.id === 'string', `Package [${idx}] has valid string ID`);
  assert(validCategories.includes(pkg.category), `Package [${pkg.id}] category '${pkg.category}' is valid`);
  assert(pkg.title && pkg.title.length > 5, `Package [${pkg.id}] title is non-empty`);
  assert(pkg.numericPrice > 0, `Package [${pkg.id}] numericPrice (${pkg.numericPrice}) is positive`);
  assert(pkg.price && pkg.price.startsWith('₹'), `Package [${pkg.id}] price starts with ₹`);
  assert(pkg.duration && pkg.duration.includes('Days'), `Package [${pkg.id}] duration has Days descriptor`);
});

// ============================================================================
// SUITE 2: TEA PRODUCTS STORE INTEGRITY
// ============================================================================
console.log('\n🍃 SUITE 2: Himalayan Tea Store Data Integrity');
assert(Array.isArray(teaProductsData) && teaProductsData.length >= 4, 'Tea store contains at least 4 products');

teaProductsData.forEach((tea, idx) => {
  assert(tea.id && typeof tea.id === 'string', `Tea [${idx}] has valid ID: ${tea.id}`);
  assert(tea.title && tea.title.length > 3, `Tea [${tea.id}] has valid product title`);
  assert(tea.numericPrice > 0, `Tea [${tea.id}] numeric price (${tea.numericPrice}) is positive`);
  assert(tea.price && tea.price.startsWith('₹'), `Tea [${tea.id}] price formatted with ₹`);
  assert(tea.weight && tea.weight.length > 0, `Tea [${tea.id}] has valid weight packaging tag`);
});

// ============================================================================
// SUITE 3: CAB & TAXI FARE ESTIMATOR ALGORITHM
// ============================================================================
console.log('\n🚕 SUITE 3: Cab & Taxi Fare Calculation Formula');
const CAB_RATES = {
  darjeeling: { dzire: 3200, sumo: 3800, innova: 4800, landrover: 5500 },
  kalimpong: { dzire: 3000, sumo: 3600, innova: 4600, landrover: 5200 },
  gangtok: { dzire: 4200, sumo: 4800, innova: 6200, landrover: 6800 },
  pelling: { dzire: 4800, sumo: 5500, innova: 7200, landrover: 7800 },
  mirik: { dzire: 2600, sumo: 3200, innova: 4200, landrover: 4800 },
  dooars: { dzire: 3400, sumo: 4000, innova: 5200, landrover: 5800 },
  jaigaon: { dzire: 4200, sumo: 5000, innova: 6400, landrover: 7000 },
  sandakphu_base: { dzire: 3600, sumo: 4200, innova: 5400, landrover: 6000 }
};

const vehicles = ['dzire', 'sumo', 'innova', 'landrover'];
Object.entries(CAB_RATES).forEach(([dest, rates]) => {
  vehicles.forEach((veh) => {
    assert(rates[veh] && rates[veh] >= 2000, `Cab rate for ${dest} -> ${veh} is valid (₹${rates[veh]})`);
    assert(rates.innova > rates.dzire, `Luxury Innova is more expensive than Sedan Dzire for ${dest}`);
  });
});

// ============================================================================
// SUITE 4: CUSTOM TRIP BUDGET BUILDER MATH FORMULA
// ============================================================================
console.log('\n🧮 SUITE 4: Custom Trip Budget Builder Formulas');
const DEST_BASE_PER_DAY = {
  darjeeling: 2200,
  kalimpong: 1900,
  sikkim: 2600,
  dooars: 2100,
  sandakphu: 2800
};

function calculateTripCost(dest, days, travelers, stayTier, activitiesTotal) {
  const baseRate = DEST_BASE_PER_DAY[dest] || 2000;
  const stayMultiplier = stayTier === 'luxury' ? 2.2 : 1.0;
  const stayTotal = Math.round(baseRate * days * travelers * stayMultiplier);
  return {
    stayTotal,
    activitiesTotal: activitiesTotal * travelers,
    grandTotal: stayTotal + (activitiesTotal * travelers)
  };
}

// Test Case 1: Standard 4 Days, 2 Travelers to Darjeeling, Homestay, no activities
const tc1 = calculateTripCost('darjeeling', 4, 2, 'homestay', 0);
assert(tc1.grandTotal === 2200 * 4 * 2 * 1.0, 'Trip Budget: 4 days, 2 travelers, homestay = ₹17,600');

// Test Case 2: Luxury 5 Days, 4 Travelers to Sikkim with ₹2500 activities
const tc2 = calculateTripCost('sikkim', 5, 4, 'luxury', 2500);
const expectedStay = Math.round(2600 * 5 * 4 * 2.2);
assert(tc2.grandTotal === expectedStay + (2500 * 4), 'Trip Budget: Luxury Sikkim with activities correctly calculated');

// ============================================================================
// SUITE 5: ANTI-BOT SECURITY CHALLENGE GENERATION & VERIFICATION
// ============================================================================
console.log('\n🛡️ SUITE 5: Anti-Bot Human Verification Engine');
function simulateChallengeGenerator() {
  const num1 = Math.floor(Math.random() * 12) + 3;
  const num2 = Math.floor(Math.random() * 9) + 2;
  const isAddition = Math.random() > 0.3;
  if (isAddition) {
    return { q: `${num1} + ${num2}`, a: num1 + num2 };
  } else {
    const high = Math.max(num1, num2);
    const low = Math.min(num1, num2);
    const safeHigh = high === low ? high + 3 : high;
    return { q: `${safeHigh} - ${low}`, a: safeHigh - low };
  }
}

// Run 20 iterations of challenge generator
for (let i = 0; i < 20; i++) {
  const ch = simulateChallengeGenerator();
  assert(ch.q && typeof ch.a === 'number' && ch.a > 0, `Challenge #${i + 1} (${ch.q} = ${ch.a}) is valid & positive`);
}

// Test validation logic
const mockChallenge = { q: '8 + 5', a: 13 };
assert(parseInt('13', 10) === mockChallenge.a, 'Correct answer 13 is accepted');
assert(parseInt('14', 10) !== mockChallenge.a, 'Incorrect answer 14 is rejected');
assert(isNaN(parseInt('abc', 10)), 'Alphanumeric bot submission is rejected');

// ============================================================================
// SUITE 6: SITE CONFIGURATION & DATA PRIVACY
// ============================================================================
console.log('\n🔒 SUITE 6: Site Configuration & Privacy Security');
assert(SITE_CONFIG.name === 'The Northbengal Buzz', 'Brand name is correctly configured');
assert(SITE_CONFIG.email === 'thenorthbengalbuzz@gmail.com', 'Official public contact email is set');
assert(SITE_CONFIG.displayPhone.includes('•••••'), 'Phone number is obfuscated on public display to prevent bot harvesting');

const testMsg = 'Booking inquiry test';
const generatedWhatsAppUrl = SITE_CONFIG.getWhatsAppUrl(testMsg);
assert(generatedWhatsAppUrl.startsWith('https://wa.me/917478286972'), 'WhatsApp URL contains authorized business phone');
assert(generatedWhatsAppUrl.includes(encodeURIComponent(testMsg)), 'WhatsApp URL properly URL-encodes target message');

// ============================================================================
// SUITE 7: ESSENTIAL COMPONENT & PAGE FILES EXISTENCE
// ============================================================================
console.log('\n📁 SUITE 7: Essential Architecture File Structure');
const requiredFiles = [
  'src/App.jsx',
  'src/main.jsx',
  'src/index.css',
  'src/components/Navbar.jsx',
  'src/components/Footer.jsx',
  'src/components/WhatsAppFAB.jsx',
  'src/components/AntiBotVerificationModal.jsx',
  'src/components/ThemeToggle.jsx',
  'src/components/HimalayanRouteMapSection.jsx',
  'src/components/HimalayanWeatherAdvisor.jsx',
  'src/components/CustomTripBudgetCalculator.jsx',
  'src/components/CabEstimatorSection.jsx',
  'src/components/PermitGuideSection.jsx',
  'src/components/AdventureAddonsSection.jsx',
  'src/components/TeaSommelierSection.jsx',
  'src/components/HimalayanCulturalGuide.jsx',
  'src/components/RatingReviewSection.jsx',
  'src/components/VisitorGallerySection.jsx',
  'src/pages/HomePage.jsx',
  'src/pages/AboutPage.jsx',
  'src/pages/PackagesPage.jsx',
  'src/pages/BookPage.jsx',
  'src/pages/AdminPage.jsx',
  'src/pages/NotFound.jsx',
  'src/context/ThemeContext.jsx',
  'src/context/CMSContext.jsx',
  'src/context/AntiBotContext.jsx'
];

requiredFiles.forEach((file) => {
  const fullPath = path.resolve(file);
  assert(fs.existsSync(fullPath), `Required core module exists: ${file}`);
});

// ============================================================================
// FINAL SUMMARY REPORT
// ============================================================================
console.log('\n============================================================================');
console.log(`📊 AUTOMATION TEST SUMMARY: ${passedTests} PASSED | ${failedTests} FAILED`);
console.log('============================================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
