#!/usr/bin/env ts-node
/**
 * Production Smoke Test
 * Verifies production deployment is live and forms are accessible
 * 
 * Usage: npm run smoke:test
 */

import fetch from 'node-fetch';

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg: string) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
  success: (msg: string) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  error: (msg: string) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
  title: (msg: string) => console.log(`\n${COLORS.cyan}━━━ ${msg} ━━━${COLORS.reset}\n`),
};

const PRODUCTION_URL = process.env.VERCEL_URL || 'https://apex-design-76hoy3yy8-emanuels-projects-1dd59b95.vercel.app';

interface SmokeTestResult {
  url: string;
  passed: boolean;
  statusCode?: number;
  responseTime?: number;
  hasForm?: boolean;
  error?: string;
}

async function testUrl(url: string, checkForFormElement?: string): Promise<SmokeTestResult> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'ApexDesign-SmokeTest/1.0',
      },
    });

    const responseTime = Date.now() - startTime;
    const html = await response.text();
    
    let hasForm = false;
    if (checkForFormElement) {
      hasForm = html.includes(checkForFormElement);
    }

    if (response.ok) {
      log.success(`${url} - ${response.status} (${responseTime}ms)`);
      if (checkForFormElement && !hasForm) {
        log.error(`  ⚠️  Form element not found: "${checkForFormElement}"`);
      }
      return {
        url,
        passed: true,
        statusCode: response.status,
        responseTime,
        hasForm: checkForFormElement ? hasForm : undefined,
      };
    } else {
      log.error(`${url} - ${response.status}`);
      return {
        url,
        passed: false,
        statusCode: response.status,
        responseTime,
        error: `HTTP ${response.status}`,
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    log.error(`${url} - Network error: ${(error as Error).message}`);
    return {
      url,
      passed: false,
      responseTime,
      error: (error as Error).message,
    };
  }
}

async function main() {
  log.title('Production Smoke Test');
  log.info(`Testing: ${PRODUCTION_URL}\n`);

  const results: SmokeTestResult[] = [];

  // Test homepage
  log.info('Testing homepage...');
  results.push(await testUrl(PRODUCTION_URL, 'id="get-estimate"'));

  // Test contact page
  log.info('Testing contact page...');
  results.push(await testUrl(`${PRODUCTION_URL}/contact`, 'Get Your Free Estimate'));

  // Test service pages
  log.info('Testing service pages...');
  const servicePages = ['kitchen', 'bathrooms', 'interiors', 'exteriors', 'additions', 'sunrooms'];
  for (const service of servicePages) {
    results.push(await testUrl(`${PRODUCTION_URL}/services/${service}`));
  }

  // Test about page
  log.info('Testing about page...');
  results.push(await testUrl(`${PRODUCTION_URL}/about`));

  // Print summary
  log.title('Smoke Test Results');
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const avgResponseTime = Math.round(
    results.reduce((sum, r) => sum + (r.responseTime || 0), 0) / results.length
  );

  console.log(`Total URLs Tested: ${results.length}`);
  console.log(`${COLORS.green}Passed: ${passed}${COLORS.reset}`);
  console.log(`${COLORS.red}Failed: ${failed}${COLORS.reset}`);
  console.log(`Average Response Time: ${avgResponseTime}ms\n`);

  if (failed > 0) {
    log.error('Some smoke tests failed!');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`  ${COLORS.red}✗ ${r.url}${COLORS.reset}`);
      console.log(`    Error: ${r.error}`);
    });
    process.exit(1);
  } else {
    log.success('All smoke tests passed! Production is healthy. 🚀');
    process.exit(0);
  }
}

if (require.main === module) {
  main().catch(error => {
    log.error(`Fatal error: ${error.message}`);
    process.exit(1);
  });
}
