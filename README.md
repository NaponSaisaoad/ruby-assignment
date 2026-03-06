Scope
สิ่งที่พัฒนาเพิ่มเติมนอกเหนือจาก Requirement หลัก
- ใช้ Frontend ด้วย React และ Ant Design เพื่อให้ UI เรียกใช้งานง่าย
- เพิ่มฟังก์ชัน Check-in และ Check-out จากหน้า Employee Detail
- Check-in / Check-out ระบบจะ refresh ข้อมูลโดยไม่ต้อง reload หน้าเว็บ
- ค้นหาพนักงานจากชื่อในหน้า Employee
- เพิ่มข้อความ Error จาก API เช่น กรณี check-in ซ้ำในวันเดียวกัน หรือ check-out ไม่ถูกต้อง
- ทำ validate จากฝั่ง API

AI Tools ที่ใช้ Claude
- ช่วยวางแนวคิด Architecture ของระบบ (Rails API + React Frontend)
- ช่วยออกแบบ Logic สำหรับ Payroll Calculation
- ช่วย Unit Test ของ Payroll
- ช่วยปรับโครงสร้างโค้ด React และ TypeScript