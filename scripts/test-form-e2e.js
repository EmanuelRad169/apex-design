const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

async function testFormSubmission() {
  console.log('🧪 Testing Form Submission End-to-End\n');
  
  const testData = {
    firstName: 'John',
    lastName: 'TestUser',
    email: 'test@example.com',
    phone: '9495551234',
    zipCode: '92614',
    projectType: 'kitchen',
    budget: '25k-plus',
    honeypot: '' // Should be empty for legitimate submission
  };

  console.log('📤 Sending test form data...');
  console.log(JSON.stringify(testData, null, 2));

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();
    
    console.log('\n📥 Response Status:', response.status);
    console.log('📥 Response Data:', JSON.stringify(data, null, 2));

    if (response.ok && data.success) {
      console.log('\n✅ TEST PASSED: Form submission successful!');
      console.log('✅ Email should have been sent to info@apexdbr.com');
      console.log('✅ Check your Gmail inbox for the test lead');
    } else {
      console.log('\n❌ TEST FAILED: Form submission returned an error');
      console.error('Error:', data.error);
    }

  } catch (error) {
    console.error('\n❌ TEST FAILED: Network error');
    console.error('Error:', error.message);
  }

  // Test 2: Rate limiting (multiple submissions)
  console.log('\n\n🧪 Testing Rate Limiting...');
  console.log('Submitting 4 times rapidly to test rate limit...\n');
  
  for (let i = 1; i <= 4; i++) {
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();
      
      if (response.status === 429) {
        console.log(`Attempt ${i}: ⚠️  Rate limit triggered (Expected) - ${data.error}`);
      } else if (response.ok) {
        console.log(`Attempt ${i}: ✅ Submission ${i} successful`);
      } else {
        console.log(`Attempt ${i}: ❌ Error - ${data.error}`);
      }
    } catch (error) {
      console.log(`Attempt ${i}: ❌ Network error - ${error.message}`);
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Test 3: Honeypot (spam protection)
  console.log('\n\n🧪 Testing Honeypot Spam Protection...');
  const spamData = { ...testData, honeypot: 'filled-by-bot' };
  
  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spamData),
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ Honeypot working: Bot submission silently accepted (no email sent)');
    } else {
      console.log('⚠️  Honeypot behavior unexpected');
    }
  } catch (error) {
    console.error('❌ Honeypot test failed:', error.message);
  }

  // Test 4: Invalid email validation
  console.log('\n\n🧪 Testing Email Validation...');
  const invalidEmailData = { ...testData, email: 'invalid-email' };
  
  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidEmailData),
    });

    const data = await response.json();
    
    if (response.status === 400 && data.error) {
      console.log('✅ Email validation working:', data.error);
    } else {
      console.log('⚠️  Email validation not working as expected');
    }
  } catch (error) {
    console.error('❌ Email validation test failed:', error.message);
  }

  console.log('\n\n✅ END-TO-END TESTING COMPLETE');
  console.log('Please check your Gmail inbox for test email(s)');
}

testFormSubmission();
