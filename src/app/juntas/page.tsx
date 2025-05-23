"use client";
import { Spin } from "antd";
import JuntasVecinales from "../components/Juntas";
import { useState } from "react";
import NavFoot from "../components/NavFoot";
import NavTop from "../components/NavTop";

 const Page = () => {
    
    return (
        <>
    <NavTop />
    <div style={{marginTop: "10%" }}>
            <JuntasVecinales /></div>
            <NavFoot />
        </>
    );
}
export default Page;