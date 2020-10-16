import React from 'react'
import { Link } from 'react-router-dom'
export default function Error() {
    return (
        <section className="section error-page">
            <div className="error-container">
                <h1>Oops! It's A Dead End</h1>
                <Link to="/" className="btn btn-primary">
                    back home
                </Link>
            </div>
        </section>
    )
}
