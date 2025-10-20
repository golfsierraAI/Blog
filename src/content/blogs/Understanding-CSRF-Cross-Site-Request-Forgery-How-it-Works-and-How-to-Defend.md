---
date: 2025-10-19T18:30:00.000Z
author: Gourav Sharma
tags:
  - OWASP
  - Performance
  - Security
description: >-
  A practical guide to Cross-Site Request Forgery (CSRF): attack mechanics, a
  minimal vulnerable example, and robust mitigation strategies with code
  snippets
imageUrl: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg'
authorImageUrl: 'https://ik.imagekit.io/cskphntm3//tr:q-1/avatar.JPG'
title: >-
  Understanding CSRF (Cross-Site Request Forgery): How it Works and How to
  Defend
---

\# Understanding CSRF (Cross-Site Request Forgery): How it Works and How to Defend

\*\*Short version:\*\* CSRF tricks a user's browser into making unwanted state-changing requests (like changing an email, transferring money) to a site where the user is authenticated. The browser includes credentials like cookies automatically, so the target site processes the action unless defenses are in place.

\---

\## Table of contents

1\. \[What is CSRF?]\(#what-is-csrf)

2\. \[How CSRF works (step-by-step)]\(#how-csrf-works-step-by-step)

3\. \[Minimal vulnerable example]\(#minimal-vulnerable-example)

4\. \[Exploit example (attacker page)]\(#exploit-example-attacker-page)

5\. \[Mitigations and best practices]\(#mitigations-and-best-practices)

\- \[1. SameSite cookies]\(#1-samesite-cookies)

\- \[2. Synchronizer (CSRF) token / anti-CSRF token]\(#2-synchronizer-csrf-token--anti-csrf-token)

\- \[3. Double-submit cookie]\(#3-double-submit-cookie)

\- \[4. Check Origin/Referer headers]\(#4-check-originreferer-headers)

\- \[5. Use custom headers + CORS]\(#5-use-custom-headers--cors)

\- \[6. Frameworks / libraries / CSRF middleware]\(#6-frameworks--libraries--csrf-middleware)

6\. \[Example mitigations — code snippets]\(#example-mitigations--code-snippets)

\- \[Express + csurf (synchronizer token pattern)]\(#express--csurf-synchronizer-token-pattern)

\- \[SameSite cookie example]\(#samesite-cookie-example)

\- \[Double-submit cookie (illustrative)]\(#double-submit-cookie-illustrative)

7\. \[Testing for CSRF]\(#testing-for-csrf)

8\. \[Key takeaways]\(#key-takeaways)

9\. \[Further reading]\(#further-reading)

\---

\## What is CSRF?

Cross-Site Request Forgery (CSRF) is an attack where a malicious site causes a victim's browser to send a request to a target site where the victim is already authenticated (cookie/session present). The attack leverages the browser's automatic inclusion of credentials (cookies, Basic auth) in cross-origin requests.

CSRF typically targets \*state-changing\* operations (POST/PUT/DELETE) rather than simple GET requests. Modern best practice is to protect all state-changing endpoints.

\---

\## How CSRF works (step-by-step)

1\. User authenticates to \`bank.example\` and browser stores an auth cookie.

2\. User visits \`attacker.example\` (malicious page) while still logged into \`bank.example\`.

3\. The malicious page triggers a request (form submission, image request, or fetch) to \`bank.example/transfer\` including the user's cookies.

4\. If \`bank.example\` doesn't validate that the request originated from a legitimate UI or site, it executes the transfer on behalf of the user.

\---

\## Minimal vulnerable example

\*\*Server-side assumption:\*\* \`POST /transfer\` simply checks session cookie and processes transfer — no CSRF checks.

\*\*vulnerable form on bank.example (server-rendered page)\*\*

\`\`\`html

\<!-- bank.example - account.html (vulnerable) -->

\<form method="POST" action="[https://bank.example/transfer](https://bank.example/transfer)">

\<input type="hidden" name="to\_account" value="attacker-account-123">

\<input type="hidden" name="amount" value="1000">

\<button type="submit">Transfer\</button>

\</form>
