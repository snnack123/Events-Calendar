import { useState, useEffect } from "react";
import { url, globalRequestParameters } from '../utils'
import emailjs from '@emailjs/browser';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [yearsOld, setYearsOld] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    let random_number = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);

    useEffect(() => {
        if (password !== '') {
            let checkLength = /^.{6,20}$/
            let checkCapital = /^.*[A-Z].*$/
            let checkSpecial = /^(.*\W|_).*$/

            if (password.match(checkLength)) {
                document.getElementById('passLength').style.color = 'green';
            } else {
                document.getElementById('passLength').style.color = 'black';
            }

            if (password.match(checkCapital)) {
                document.getElementById('passCapital').style.color = 'green';
            } else {
                document.getElementById('passCapital').style.color = 'black';
            }

            if (password.match(checkSpecial)) {
                document.getElementById('passSpecial').style.color = 'green';
            } else {
                document.getElementById('passSpecial').style.color = 'black';
            }

        } else {
            document.getElementById('passLength').style.color = 'black';
            document.getElementById('passCapital').style.color = 'black';
            document.getElementById('passSpecial').style.color = 'black';

        }
    }, [password])

    const register = (e) => {
        e.preventDefault();

        let checkEmail = { email: email }

        let requestParameters = { ...globalRequestParameters };
        requestParameters.method = "POST";
        requestParameters.body = JSON.stringify(checkEmail);

        fetch(url + "checkExistAccount", requestParameters)
            .then(res => res.json()
                .then(res => {
                    console.log(res.exist);
                    if (res.exist === 1) {
                        document.getElementById('error').innerHTML = 'Acest cont deja exista!';
                        document.getElementById('error').style.color = 'tomato';
                    } else {
                        document.getElementById('error').innerHTML = '';
                        let passw = /^(?=.*\W|_)(?=.*[A-Z]).{6,20}$/
                        let letters = /^[A-Za-z]+$/;

                        if (!password.match(passw)) {
                            document.getElementById('error').innerHTML = 'Incearca o noua parola!';
                            document.getElementById('error').style.color = 'tomato';
                        } else if (!name.match(letters)) {
                            document.getElementById('error').innerHTML = 'Numele nu poate contine cifre!';
                            document.getElementById('error').style.color = 'tomato';
                        } else if (name.length < 5 || name.length > 45) {
                            document.getElementById('error').innerHTML = 'Numele este prea lung!';
                            document.getElementById('error').style.color = 'tomato';
                        } else {
                            if (password !== passwordAgain) {
                                document.getElementById('error').innerHTML = 'Parolele nu corespund!';
                                document.getElementById('error').style.color = 'tomato';
                            } else if (isNaN(document.getElementById('years_old').value) === true) {
                                document.getElementById('error').innerHTML = 'Varsta trebuie sa fie un numar!';
                                document.getElementById('error').style.color = 'tomato';
                            } else {
                                document.getElementById('error').innerHTML = '';
                                let new_user = { name, email, yearsOld, password, passwordAgain, random_number };

                                requestParameters.body = JSON.stringify(new_user);

                                fetch(url + "add-user", requestParameters)
                                    .then((res) => {
                                        console.log(res);
                                        document.getElementById('createAccount').style.display = 'none';
                                        document.getElementById('error').innerHTML = 'Contul a fost creat cu succes!'
                                        document.getElementById('error').style.color = 'green';
                                        setName('');
                                        setYearsOld('');
                                        setEmail('');
                                        setPassword('');
                                        setPasswordAgain('');
                                        document.getElementById('registerUser').reset();

                                        emailjs.sendForm('service_k0vry5h', 'template_yq80re6', '#registerUser', 'user_HyEzrOhNEBkhLc9eyisaW')
                                            .then(function (response) {
                                                console.log('SUCCESS!', response.status, response.text);
                                            }, function (error) {
                                                console.log('FAILED...', error);
                                            });
                                    });
                            }
                        }
                    }
                }))
    }

    return (
        <div className='create'>
            <h1>Inregistrare cont utilizator</h1>
            <p style={{ textAlign: 'left', fontSize: '90%' }}>Toate campurile marcate cu <span className="star">*</span> sunt obligatorii</p>
            <form onSubmit={register} id='registerUser'>
                <label>Numele complet<span className="star">*</span>:</label>
                <input
                    type='text'
                    required
                    value={name}
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Varsta<span className="star">*</span>:</label>
                <input
                    type='text'
                    required
                    id='years_old'
                    value={yearsOld}
                    onChange={(e) => setYearsOld(e.target.value)}
                />
                <label>Adresa Email<span className="star">*</span>:</label>
                <input
                    type='email'
                    required
                    value={email}
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Stabiliti parola<span className="star">*</span>:</label>
                <br></br>
                <ul style={{ textAlign: 'left', fontSize: '85%', fontWeight: 'bold' }}>
                    <li id='passLength'>Intre 6 - 20 caractere</li>
                    <li id='passCapital'>Cel putin o litera mare</li>
                    <li id='passSpecial'>Cel putin un semn</li>
                </ul>
                <input
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Repetati parola<span className="star">*</span>:</label>
                <input
                    type='password'
                    required
                    value={passwordAgain}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                />
                <input
                    type='hidden'
                    name='cod'
                    value={random_number}
                ></input>
                <button id='createAccount'>Creeaza utilizator</button>
                <p id="error" style={{ fontSize: '110%' }}></p>
                <br></br>
                <p style={{ textAlign: 'left' }}>By clicking "Creeaza utilizator" you are agreeing to our</p>
                <p style={{ textAlign: 'left' }}><a href='#'>Privacy Policy</a> & <a href='#'>Terms of Service</a></p>
            </form>
        </div>
    );
}

export default Register;