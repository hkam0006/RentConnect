import React, { useState } from 'react';
import Hamburger from 'hamburger-react'

export default function MenuBar() {
    const [isOpen, setOpen] = useState(false)
    return(
        <>
        <Hamburger toggled={isOpen} toggle={setOpen}/>
        {isOpen && (
            <div className="menu-items">
                    <li>Dashboard</li>
                    <li>Inbox</li>
                    <li>Inspection</li>
                    <li>Inspection Runs</li>
            </div>
        )}
        </>
    );

}