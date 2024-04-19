import React, { useState } from 'react';
import Hamburger from 'hamburger-react'

export default function MenuBar() {
    const [isOpen, setOpen] = useState(false)
    return(
        <Hamburger/>
    );

}