"use client";
import { Spin } from "antd";
import JuntasVecinales from "../components/Juntas";
import { useState } from "react";
import NavFoot from "../components/NavFoot";
import NavTop from "../components/NavTop";
import ProtectedRoute from '../components/ProtectedRoute';

 const Page = () => {
    
    return (
        <ProtectedRoute>
            <NavTop />
            <div style={{marginTop: "10%" }}>
                <JuntasVecinales />
            </div>
            <NavFoot />
        </ProtectedRoute>
    );
}
export default Page;