مشروع: API Docs Website (Express + React)

المحتوى:
- server/: خادم Express مع راوتر `/api/savetube` (مضمّن كود savetube).
- client/: واجهة React (Vite) تعرض جدول API وتسمح باختبار endpoint.

التشغيل محلياً:
1. الخادم:
   cd server
   npm install
   npm run dev

2. الواجهة:
   cd client
   npm install
   npm run dev

ثم افتح الواجهة (عادةً http://localhost:5173) وأدخل رابط السيرفر (مثال http://localhost:3333) في حقل Base.

ملاحظة: الحقول والإعدادات مهيأة لتشغيل محلي. تأكد من تثبيت Node.js و npm.
