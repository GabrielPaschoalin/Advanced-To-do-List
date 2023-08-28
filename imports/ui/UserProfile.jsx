import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from 'react-router';


const UserProfile = () => {

    const user = useTracker(() => Meteor.user());

    const [username, setUsername] = useState(user.username);
    const [nome, setNome] = useState(user.profile.nome);
    const [dataNascimento, setDataNascimento] = useState(user.profile.dataNascimento);
    const [sexo, setSexo] = useState(user.profile.sexo);
    const [empresa, setEmpresa] = useState(user.profile.empresa);

    const navigate = useNavigate();

    const updateUserProfile = () => {
        // Assuming you have a Meteor method to update user profile
        Meteor.call('updateUserProfile', user._id, {
            username,
            profile: {
                nome,
                dataNascimento,
                sexo,
                empresa
            }
        }, (error) => {
            if (!error) {
                console.log('User profile updated successfully.');
                navigate("/tasks");
            } else {
                console.error('Error updating user profile:', error);
            }
        });
    };

    const cancelUpdate = () => {
        navigate('/tasks');
    }

    return (
        <div className='userProfile'>

            <h2>USER PROFILE</h2>
            <div className='login-form'>
                <TextField variant="filled" color="secondary" margin="dense" onChange={(e) => setNome(e.target.value)} label="Nome" value={nome} />
                <TextField variant="filled" color="secondary" margin="dense" onChange={(e) => setEmail(e.target.value)} label="Email" value={username} />
                <TextField variant="filled" color="secondary" margin="dense" onChange={(e) => setDataNascimento(e.target.value)} label="Data de Nascimento" value={dataNascimento} />
                <TextField variant="filled" color="secondary" margin="dense" onChange={(e) => setEmpresa(e.target.value)} label="Empresa" value={empresa} />
            </div>

            <div className="edit-button-container">
                <Button variant="contained" onClick={updateUserProfile}>
                    ATUALIZAR PERFIL
                </Button>
                <Button variant="contained" color="secondary" onClick={cancelUpdate}>
                    CANCELAR
                </Button>
            </div>

        </div>
    );
};

export default UserProfile;