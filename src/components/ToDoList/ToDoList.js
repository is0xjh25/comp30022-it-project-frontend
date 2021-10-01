import React from 'react'
import { useState, useEffect } from 'react';

export default function ToDoList() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    if (loading) {
        return <div>loading...
        </div>
    }    


    return (
        <div>
            
        </div>
    )
}
