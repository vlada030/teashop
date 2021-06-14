import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import { useHistory } from "react-router-dom";

export const UserInterface = ({
    loginPage,
    handleSubmit,
    infoMsg,
    username,
    handleUsername,
    email,
    handleEmail,
    password,
    handlePassword,
    handleToggleForm,
    usernameField
}) => {
    return (
        <Wrapper className="section-center page-100">
            <form onSubmit={handleSubmit} className="form" noValidate>
                <h3>{loginPage ? "Prijava" : "Registracija"}</h3>

                <div className="form-container">
                    {infoMsg ? <p className="info">{infoMsg}</p> : null}

                    {!loginPage ? (
                        <div className="form-control">
                            {/* <label htmlFor='username'>Vaše ime</label> */}
                            <input
                                type="text"
                                value={username}
                                onChange={handleUsername}
                                placeholder="Vaše ime"
                            />
                        </div>
                    ) : null}

                    <div className="form-control">
                        {/* <label htmlFor='username'>Vaš e-mail</label> */}
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmail}
                            ref={usernameField}
                            placeholder="Vaš e-mail"
                        />
                    </div>

                    <div className="form-control">
                        {/* <label htmlFor='password'>Vaša šifra</label> */}
                        <input
                            type="password"
                            value={password}
                            onChange={handlePassword}
                            placeholder="Vaša šifra"
                        />
                    </div>

                    <button className="btn submit-btn" type="submit">
                        Pošalji
                    </button>

                    <p className="registration">
                        {loginPage
                            ? "Ukoliko nemate nalog, najpre se"
                            : "Povratak na"}
                        <button onClick={handleToggleForm}>
                            {" "}
                            {loginPage ? "registrujte" : "prijavu"}
                        </button>
                    </p>
                </div>
            </form>
        </Wrapper>
    );
};

const AuthenticationPage = () => {
    const { loginPage, infoMsg, user, toggleForm, fetchUser } =
        useUserContext();
    const history = useHistory();
    const usernameField = useRef(null);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchUser({ username, email, password });
    };

    // OBAVEZNO za button u okviru forma da se ubaci preventDefault()
    const handleToggleForm = (e) => {
        e.preventDefault();
        toggleForm();
    };

    useEffect(() => {
        usernameField.current.focus();
    }, []);

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                history.push("/");
            }, 500);
        }
        // eslint-disable-next-line
    }, [user]);

    return (
        <UserInterface
            loginPage={loginPage}
            handleSubmit={handleSubmit}
            infoMsg={infoMsg}
            username={username}
            handleUsername={handleUsername}
            email={email}
            handleEmail={handleEmail}
            password={password}
            handlePassword={handlePassword}
            handleToggleForm={handleToggleForm}
            usernameField={usernameField}
        />
    );
};

const Wrapper = styled.section`
    display: grid;
    place-items: center;

    .form {
        background-color: var(--clr-primary-10);
        border-radius: var(--radius);
        width: 100%;
        max-width: var(--fixed-width);

        h3 {
            background-color: var(--clr-primary-5);
            border-radius: var(--radius);
            padding: 1rem 2rem;
            /* margin: 0; */
        }
    }

    .form-container {
        padding: 1rem 2rem;
    }

    .info {
        color: var(--clr-red-dark);
    }

    .form-control {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;

        label {
            letter-spacing: var(--spacing);
        }

        input {
            height: 2rem;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid var(--clr-primary-5);
            font-size: inherit;
            transition: var(--transition);
            letter-spacing: var(--spacing);

            &:focus {
                outline: none;
                border-bottom: 1px solid var(--clr-primary-8);
            }

            &::placeholder {
                opacity: 0.4;
            }
        }
    }

    .submit-btn {
        display: block;
        margin: 2rem auto;
    }

    .registration {
        text-align: center;

        button {
            background-color: transparent;
            border: none;
            font: inherit;
            font-weight: 600;
            color: inherit;
            margin-left: 0.5rem;
            cursor: pointer;
            text-transform: uppercase;
            transition: var(--transition);

            &:hover {
                color: var(--clr-primary-5);
            }
        }
    }
`;

export default AuthenticationPage;
