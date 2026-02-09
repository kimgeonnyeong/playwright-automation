import { test } from '@playwright/test';

test('로그인 세션 저장', async ({ page }) => {
  await page.goto('/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');

  await page.locator('#login-button').click();

  // 로그인 성공 상태 저장
  await page.context().storageState({ path: 'auth.json' });
});
