#!/usr/bin/env ts-node
/**
 * End-to-End Test for Formspree Form Submissions
 * Tests both homepage lead form and contact page form
 * 
 * Usage: npm run test:forms
 */

import fetch from 'node-fetch';

interface TestResult {
  testName: string;
  passed: boolean;
  statusCode?: number;
  responseTime?: number;
  error?: string;
  submissionId?: string;
}

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// ⚠️ IMPORTANT: Replace these with your actual Formspree IDs after setup
const HOMEPAGE_FORM_ID = process.env.FORMSPREE_HOMEPAGE_ID || 'YOUR_FORMSPREE_ID';
const CONTACT_FORM_ID = process.env.FORMSPREE_CONTACT_ID || 'YOUR_FORMSPREE_ID';

const log = {
  info: (msg: string) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
  success: (msg: string) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  error: (msg: string) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
  warn: (msg: string) => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
  title: (msg: string) => console.log(`\n${COLORS.cyan}━━━ ${msg} ━━━${COLORS.reset}\n`),
};

async function testHomepageLeadForm(): Promise<TestResult> {
  log.info('Testing homepage lead form...');
  
  const startTime = Date.now();
  const testData = {
    name: 'E2E Test Lead',
    email: 'e2etest@example.com',
    phone: '(949) 555-0199',
    zipCode: '92614',
    projectType: 'kitchen',
    budget: '25k-plus',
    _subject: 'E2E Test: Homepage Lead Form',
  };

  try {
    const response = await fetch(`https://formspree.io/f/${HOMEPAGE_FORM_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const responseTime = Date.now() - startTime;
    const data = await response.json() as any;

    if (response.ok && response.status === 200) {
      log.success(`Homepage form submitted successfully (${responseTime}ms)`);
      return {
        testName: 'Homepage Lead Form',
        passed: true,
        statusCode: response.status,
        responseTime,
        submissionId: data.next || 'N/A',
      };
    } else {
      log.error(`Homepage form failed: ${response.status} - ${data.error || 'Unknown error'}`);
      return {
        testName: 'Homepage Lead Form',
        passed: false,
        statusCode: response.status,
        responseTime,
        error: data.error || 'Submission failed',
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    log.error(`Network error: ${(error as Error).message}`);
    return {
      testName: 'Homepage Lead Form',
      passed: false,
      responseTime,
      error: (error as Error).message,
    };
  }
}

async function testContactPageForm(): Promise<TestResult> {
  log.info('Testing contact page form...');
  
  const startTime = Date.now();
  const testData = {
    name: 'E2E Test Contact',
    email: 'e2etest-contact@example.com',
    phone: '(949) 555-0188',
    zipCode: '92617',
    serviceType: 'bathroom',
    budget: '50k-100k',
    message: 'This is an automated E2E test submission. Please ignore.',
    _subject: 'E2E Test: Contact Page Form',
  };

  try {
    const response = await fetch(`https://formspree.io/f/${CONTACT_FORM_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const responseTime = Date.now() - startTime;
    const data = await response.json() as any;

    if (response.ok && response.status === 200) {
      log.success(`Contact form submitted successfully (${responseTime}ms)`);
      return {
        testName: 'Contact Page Form',
        passed: true,
        statusCode: response.status,
        responseTime,
        submissionId: data.next || 'N/A',
      };
    } else {
      log.error(`Contact form failed: ${response.status} - ${data.error || 'Unknown error'}`);
      return {
        testName: 'Contact Page Form',
        passed: false,
        statusCode: response.status,
        responseTime,
        error: data.error || 'Submission failed',
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    log.error(`Network error: ${(error as Error).message}`);
    return {
      testName: 'Contact Page Form',
      passed: false,
      responseTime,
      error: (error as Error).message,
    };
  }
}

function checkFormspreeConfiguration(): boolean {
  log.info('Checking Formspree configuration...');
  
  let configOk = true;

  if (HOMEPAGE_FORM_ID === 'YOUR_FORMSPREE_ID') {
    log.warn('Homepage Formspree ID not configured!');
    log.warn('Set FORMSPREE_HOMEPAGE_ID environment variable or update code');
    configOk = false;
  } else {
    log.success(`Homepage form ID: ${HOMEPAGE_FORM_ID}`);
  }

  if (CONTACT_FORM_ID === 'YOUR_FORMSPREE_ID') {
    log.warn('Contact page Formspree ID not configured!');
    log.warn('Set FORMSPREE_CONTACT_ID environment variable or update code');
    configOk = false;
  } else {
    log.success(`Contact form ID: ${CONTACT_FORM_ID}`);
  }

  return configOk;
}

function printSummary(results: TestResult[]): void {
  log.title('Test Summary');

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const totalTime = results.reduce((sum, r) => sum + (r.responseTime || 0), 0);

  console.log(`Total Tests: ${results.length}`);
  console.log(`${COLORS.green}Passed: ${passed}${COLORS.reset}`);
  console.log(`${COLORS.red}Failed: ${failed}${COLORS.reset}`);
  console.log(`Total Time: ${totalTime}ms\n`);

  results.forEach(result => {
    const icon = result.passed ? COLORS.green + '✓' : COLORS.red + '✗';
    console.log(`${icon} ${result.testName}${COLORS.reset}`);
    console.log(`  Status: ${result.statusCode || 'N/A'}`);
    console.log(`  Response Time: ${result.responseTime}ms`);
    if (result.error) {
      console.log(`  ${COLORS.red}Error: ${result.error}${COLORS.reset}`);
    }
    console.log('');
  });

  if (failed > 0) {
    log.error('Some tests failed! Check configuration and try again.');
    log.info('See FORMSPREE_SETUP.md for setup instructions');
  } else {
    log.success('All tests passed! Forms are ready for production.');
  }
}

async function main() {
  log.title('Formspree E2E Form Testing');

  // Step 1: Check configuration
  const configOk = checkFormspreeConfiguration();
  if (!configOk) {
    log.error('\n❌ Configuration incomplete!');
    log.info('Follow these steps:');
    log.info('1. Create Formspree account at https://formspree.io');
    log.info('2. Create two forms and copy their IDs');
    log.info('3. Update the IDs in this script or set environment variables');
    log.info('4. Run tests again\n');
    process.exit(1);
  }

  // Step 2: Run tests
  const results: TestResult[] = [];
  
  results.push(await testHomepageLeadForm());
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between tests
  
  results.push(await testContactPageForm());

  // Step 3: Print summary
  printSummary(results);

  // Step 4: Exit with appropriate code
  const allPassed = results.every(r => r.passed);
  process.exit(allPassed ? 0 : 1);
}

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    log.error(`Fatal error: ${error.message}`);
    process.exit(1);
  });
}

export { testHomepageLeadForm, testContactPageForm };
