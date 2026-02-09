import { test, expect } from '@playwright/test';

test('SauceDemo 전체 시나리오 (로그인 포함 + 천천히 보기)', async ({ page }) => {

  // ✅ 1) 로그인 화면 진입
  await test.step('로그인 페이지 열기', async () => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();

    // 천천히 보기용 잠깐 멈춤
    await page.waitForTimeout(1000);
  });

  // ✅ 2) 로그인 수행
  await test.step('로그인 하기', async () => {
    await page.locator('#user-name').fill('standard_user');
    await page.waitForTimeout(500);

    await page.locator('#password').fill('secret_sauce');
    await page.waitForTimeout(500);

    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory/);

    await page.waitForTimeout(1000);
  });

  // ✅ 3) 상품 담기
  await test.step('상품 1개 장바구니 담기', async () => {
    await page.locator('text=Add to cart').first().click();

    // 장바구니 숫자 표시 확인
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.waitForTimeout(1000);
  });

  // ✅ 4) 장바구니 이동
  await test.step('장바구니 페이지 이동', async () => {
    await page.locator('.shopping_cart_link').click();

    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('.cart_item')).toHaveCount(1);

    await page.waitForTimeout(1000);
  });

  // ✅ 5) Checkout 시작
  await test.step('Checkout 시작', async () => {
    await page.locator('#checkout').click();

    await expect(page).toHaveURL(/checkout-step-one/);

    await page.waitForTimeout(1000);
  });

  // ✅ 6) 사용자 정보 입력
  await test.step('배송 정보 입력', async () => {
    await page.locator('#first-name').fill('rex');
    await page.waitForTimeout(500);

    await page.locator('#last-name').fill('kim');
    await page.waitForTimeout(500);

    await page.locator('#postal-code').fill('12345');
    await page.waitForTimeout(500);

    await page.locator('#continue').click();

    await expect(page).toHaveURL(/checkout-step-two/);

    await page.waitForTimeout(1000);
  });

  // ✅ 7) 주문 완료
  await test.step('주문 완료하기', async () => {
    await page.locator('#finish').click();

    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');

    await page.waitForTimeout(1500);
  });

  // ✅ 8) 로그아웃
  await test.step('로그아웃 하기', async () => {
    await page.locator('#react-burger-menu-btn').click();
    await page.waitForTimeout(800);

    await page.locator('#logout_sidebar_link').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await page.waitForTimeout(1000);
  });

});
