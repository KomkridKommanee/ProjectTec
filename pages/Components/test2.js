import React, { useState } from 'react';

export default function Addgarbage() {
  const [isOn, setIsOn] = useState(true);
  const [selectedDay, setSelectedDay] = useState('');

  const toggleButton = () => {
    setIsOn(!isOn);
  };
  
  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  // สร้าง options สำหรับเลือกวันที่ 1-31
  const dayOptions = [];
  for (let i = 1; i <= 31; i++) {
    dayOptions.push(
      <option key={i} value={i}>{i}</option>
    );
  }

  const [selectedMonth, setSelectedMonth] = useState('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const [selectedYear, setSelectedYear] = useState('');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // สร้าง options สำหรับเลือกปี พ.ศ. ๒๕๓๐ - พ.ศ. ๒๕๗๐
  const currentYear = new Date().getFullYear() + 543; // ปีปัจจุบัน
  const yearOptions = [];
  for (let i = currentYear - 20; i <= currentYear + 20; i++) {
    yearOptions.push(
      <option key={i} value={i}>{i}</option>
    );
  }

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div
      name="Addgarbage"
      style={{
        backgroundColor: "#F4F4F4",
        width: 1500,
        height: 1024,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        name="Rectangle 46"
        style={{
          backgroundColor: "#FFF9F9",
          borderRadius: 20,
          width: 677,
          height: 811,
          position: "absolute",
          left: 381,
          top: 107,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.4)"
        }}
      ></div>
      <select
        name="Rectangle 36"
        style={{
          backgroundColor: "#FFF",
          borderRadius: 5,
          width: 136,
          height: 43,
          position: "absolute",
          left: 649,
          top: 390,
          padding: '5px', // เพิ่ม padding เพื่อให้ dropdown ดูสวยงาม
          fontSize: '16px', // เพิ่มขนาดตัวอักษรของ dropdown
          border: '1px solid #ccc', // เพิ่มเส้นขอบให้ dropdown
          boxSizing: 'border-box', // แก้ปัญหาความกว้างและความสูงที่ไม่ถูกต้องของ dropdown
          color:'#000',
          textAlign:"center"
        }}
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        <option value="">เดือน</option>
        <option value="มกราคม">มกราคม</option>
        <option value="กุมภาพันธ์">กุมภาพันธ์</option>
        <option value="มีนาคม">มีนาคม</option>
        <option value="เมษายน">เมษายน</option>
        <option value="พฤษภาคม">พฤษภาคม</option>
        <option value="มิถุนายน">มิถุนายน</option>
        <option value="กรกฎาคม">กรกฎาคม</option>
        <option value="สิงหาคม">สิงหาคม</option>
        <option value="กันยายน">กันยายน</option>
        <option value="ตุลาคม">ตุลาคม</option>
        <option value="พฤศจิกายน">พฤศจิกายน</option>
        <option value="ธันวาคม">ธันวาคม</option>
      </select>
      <div
        name="เพิ่มอัตราค่าขยะ"
        style={{
          color: "#242424",
          width: 200,
          height: 26,
          fontFamily: "Kumbh Sans",
          fontSize: 25,
          fontWeight: 600,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)", // เปลี่ยน transform เพื่อจัดให้ข้อความอยู่ตรงกลาง
          top: 180
        }}
      >
        เพิ่มอัตราค่าขยะ
      </div>
      <div
        name="อัตราค่าขยะ"
        style={{
          color: "#242424",
          width: 133,
          height: 26,
          fontFamily: "Kumbh Sans",
          fontSize: 20,
          fontWeight: 600,
          position: "absolute",
          right: "67%",
          transform: "translateX(140.5px)",
          top: 258
        }}
      >
        อัตราค่าขยะ
      </div>
      <input
        type="number"
        name="Rectangle 44"
        style={{
          backgroundColor: "#FFF",
          borderRadius: 5,
          width: 136,
          height: 43,
          position: "absolute",
          left: 648,
          top: 250,
          padding: '5px', // เพิ่ม padding เพื่อให้ input ดูสวยงาม
          fontSize: '16px', // เพิ่มขนาดตัวอักษรของ input
          border: '1px solid #ccc', // เพิ่มเส้นขอบให้ input
          boxSizing: 'border-box', // แก้ปัญหาความกว้างและความสูงที่ไม่ถูกต้องของ input
          color:"#000",
          textAlign:"center",
        }}
        value={inputValue}
        onChange={handleInputChange}
      />
       <select
        name="Rectangle 41"
        style={{
          backgroundColor: "#FFF",
          borderRadius: 5,
          width: 100,
          height: 43,
          position: "absolute",
          left: 521,
          top: 390,
          padding: '5px', // เพิ่ม padding เพื่อให้ dropdown ดูสวยงาม
          fontSize: '16px', // เพิ่มขนาดตัวอักษรของ dropdown
          border: '1px solid #ccc', // เพิ่มเส้นขอบให้ dropdown
          boxSizing: 'border-box', // แก้ปัญหาความกว้างและความสูงที่ไม่ถูกต้องของ dropdown
          color : "#000",
          textAlign : 'center'
        }}
        value={selectedDay}
        onChange={handleDayChange}
      >
        <option value="">วันที่</option>
        {dayOptions}
      </select>
      <div
        name="Rectangle 43"
        style={{
          backgroundColor: isOn ? "#10D20C" : "#FF0000", // แสดงสีตามสถานะ
          borderRadius: 20,
          width: 128,
          height: 50,
          position: "absolute",
          left: 652,
          top: 479,
          display: "flex",
          justifyContent: isOn ? "flex-end" : "flex-start", // จัดเนื้อหาไปทางขวาหรือซ้ายตามสถานะ
          alignItems: "center",
          padding: 5,
          cursor: "pointer",
          transition: "background-color 0.3s ease" // เพิ่มเอฟเฟกต์ transition เมื่อมีการเปลี่ยนสี
        }}
        onClick={toggleButton} // เรียกใช้ toggleButton เมื่อคลิกที่ปุ่ม
      >
        <div
          style={{
            backgroundColor: "#FFF",
            borderRadius: "50%",
            width: 40,
            height: 40,
            transition: "transform 0.3s ease", // เพิ่มเอฟเฟกต์ transition เมื่อมีการเปลี่ยนขนาดหรือตำแหน่ง
            transform: isOn ? "translateX(-4px)" : "translateX(5px)" // ย้ายตำแหน่งของ Toggle Indicator ตามสถานะ
          }}
        />
      </div>
      <select
        name="Rectangle 42"
        style={{
          backgroundColor: "#FFF",
          borderRadius: 5,
          width: 100,
          height: 43,
          position: "absolute",
          left: 811,
          top: 390,
          padding: '5px', // เพิ่ม padding เพื่อให้ dropdown ดูสวยงาม
          fontSize: '16px', // เพิ่มขนาดตัวอักษรของ dropdown
          border: '1px solid #ccc', // เพิ่มเส้นขอบให้ dropdown
          boxSizing: 'border-box', // แก้ปัญหาความกว้างและความสูงที่ไม่ถูกต้องของ dropdown
          color:"#000",
          textAlign:"center"
        }}
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option value="">ปี</option>
        {yearOptions}
      </select>
      <button
        name="Rectangle 40"
        style={{
          backgroundColor: "#E9ED42",
          borderRadius: 5,
          width: 128,
          height: 43,
          fontSize: 20,
          fontWeight: 600,
          position: "absolute",
          left: 652,
          top: 569,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none", // ลบเส้นขอบ
          cursor: "pointer", // ทำให้เป็นตัวชี้
        }}
      >
        บันทึก
      </button>
      <div
        name="บาท"
        style={{
          color: "#242424",
          width: 133,
          height: 26,
          fontFamily: "Kumbh Sans",
          fontSize: 20,
          fontWeight: 600,
          position: "absolute",
          left: "50%",
          transform: "translateX(140.5px)",
          top: 258
        }}
      >
        บาท
      </div>
      <div
        name="วัน/เดือน/ปี"
        style={{
          color: "#242424",
          width: 133,
          height: 26,
          fontFamily: "Kumbh Sans",
          fontSize: 25,
          fontWeight: 600,
          position: "absolute",
          left: "46%",
          transform: "translateX(-4.5px)",
          top: 338
        }}
      >
        วัน/เดือน/ปี
      </div>
      <svg
        name="Ellipse 1"
        x={738}
        y={485}
        width={33}
        height={33}
      >
      </svg>
    </div>
  );
}
