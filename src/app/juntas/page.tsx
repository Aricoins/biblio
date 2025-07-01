"use client";
import { Spin } from "antd";
import JuntasVecinales from "../components/Juntas";
import JuntaNormativas from "../components/JuntasGenerales";
import { useState } from "react";
import NavFoot from "../components/NavFoot";
import NavTop from "../components/NavTop";
import ProtectedRoute from '../components/ProtectedRoute';

 const Page = () => {
    
    return (
        <ProtectedRoute>
            <NavTop />
            <div style={{marginTop: "15%" }}>
                <JuntasVecinales />
            </div>

            <div style={{marginTop: "1%" }}>
                <JuntaNormativas />
            </div>
            <NavFoot />
        </ProtectedRoute>
    );
}
export default Page;