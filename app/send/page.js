'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Style.module.scss'
import { useSession } from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
    const router = useRouter();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [to, setTo] = useState('');
    const [tem, setTem] = useState('');
    const [Fb, setFb] = useState('');
    const [Insta, setInsta] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { data: session } = useSession();

    var template
    const handleFileUpload = async (event) => {
        template = event.target.files[0];
  
};
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    const email = session.user.email;
    // const template = `
    //   <h3>Hello</h3>
    //   <li> title: ${subject}</li>
    //   <li> message: ${message}</li>
    // `



    try {
        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, subject, message, to, tem, Fb, Insta }),
        });

        if (!response.ok) {
            throw new Error(`Email sending failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (data.message === 'Email Sent Successfully') {
            setSubject('');
            setMessage('');
            setTo('');
            // router.push('/success'); // Redirect to a success page
            alert("Sent successfully.")
        } else {
            throw new Error('Email sending failed on server.');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        setErrorMessage(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  if(session && session.user){
    return (
        <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
            <section className={styles.s1}>
                <h1>
                    Send email
                </h1>
                <h4>
                    {session.user.name}<br/>{session.user.email}
                </h4>
                <input
                    type="text"
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder='To *'
                    // required
                />
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder='Subject *'
                    required
                />
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Message *'
                    required
                />
                <input
                    type="text"
                    id="a"
                    value={Fb}
                    onChange={(e) => setFb(e.target.value)}
                    placeholder='Facebook Link'
                />
                <input
                    type="text"
                    id="a"
                    value={Insta}
                    onChange={(e) => setInsta(e.target.value)}
                    placeholder='Instragram Link'
                />
                {/* <input id="file-upload" type="file" className={styles.file}/> */}
                <button type="submit" disabled={isLoading} className={styles.send}>
                    {isLoading ? 'Sending...' : 'Send Email'}
                </button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </section>
            <section className={styles.s2}>
                <h1>
                    Email templates
                </h1>
                <div className={styles.sel}>
                    <div>
                        <input type="radio" id="1" name="template" value="1" hidden 
                        onChange={(e) => setTem(e.target.value)}
                        checked
                        />
                        <label for="1" className={styles.lab}>
                            <div className={styles.l}>
                            <Image
                                src={'/temp1.png'}
                                width={32}
                                height={32}
                                alt='1'
                                className={styles.img}
                            />
                            </div>
                        </label>
                    </div>
                    
                    <div>
                        <input type="radio" id="2" name="template" value="2" hidden 
                        onChange={(e) => setTem(e.target.value)}
                        />
                        <label for="2" className={styles.lab}>
                            <div className={styles.l}>
                            <Image
                                src={'/favicon.svg'}
                                width={32}
                                height={32}
                                alt='2'
                                className={styles.img}
                            />
                            </div>
                        </label>
                    </div>
                </div>
            </section>
            </form>
        </main>
    );
    }
    else if(!session){
        router.push('./')
    }
}