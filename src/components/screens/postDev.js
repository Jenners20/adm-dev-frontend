import React, { Component } from 'react';
import '../styles/App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrashAlt, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, CardBody, CardColumns, CardGroup, CardSubtitle, CardText, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Navbar } from '../Navbar';

const url = "https://localhost:4000/api/empresas/";

class PostDev extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            id: '',
            name: '',
            company: '',
            certification: '',
            email: '',
            phone: '',
            pos: true,
            program_name: '',
            independent: true,
            tipoModal: ''
        }
    }

    peticionGet = () => {
        let getdeveloper = 'http://localhost:4000/developer'
        axios.get(getdeveloper).then(response => {
            this.setState({ data: response.data['developer'] });
            console.log(response)
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPost = async () => {
        let postdeveloper = 'http://localhost:4000/developer'
        console.log('llegando')
        let config =
        {
            "headers": {
                "Content-Type": 'application/json'
            }
        }
        let payload = {
            "developer_id": 1,
            "developer_name": this.state.form.name,
            "developer_company": this.state.form.company,
            "certification_id": this.state.form.certification,
            "email": this.state.form.email,
            "phone": this.state.form.phone,
            "pos": true,
            "program_name": this.state.form.program_name,
            "independent": true,
        }
        console.log(payload);
        console.log(this.state.form)
        delete this.state.form.developer_id;
        await axios.post(postdeveloper, payload, config).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPut = () => {
        axios.put(url + this.state.form.id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        })
    }

    peticionDelete = () => {

        axios.delete('http://localhost:4000/developer/' + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    seleccionarEmpresa = (empresa) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: empresa.developer_id,
            }
        })
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
    }
    setBoolValue(value) {
        if (value == true) {
            return <FontAwesomeIcon icon={faCheck} />
        } else {
           return <FontAwesomeIcon icon={faXmark} />
        }
    }

    render() {

        const { form } = this.state;
        return (

            <div className="main">
                <Navbar />
                <br /><br /><br />
                <center><h1>Desarrolladores</h1></center>
                <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Desarrollador</button>
                <br /><br />
                <div className="data">

                    <CardColumns>
                        {this.state.data.map(desarrollador => {
                            return (
                                <Card
                                    className="my-2"
                                    style={{
                                        width: '28rem',
                                        height: '20rem'
                                    }}
                                >
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            {desarrollador.developer_name}
                                        </CardTitle>
                                        <CardText>
                                            Certificacion: {desarrollador.certification_id}
                                            <br />
                                            email: {desarrollador.email}
                                            <br />
                                            telefono: {desarrollador.phone}
                                            <br />
                                            POS: {this.setBoolValue(desarrollador.pos)}
                                            <br />
                                            Programa: {desarrollador.program_name}
                                            <br />
                                            Independiente: {this.setBoolValue(desarrollador.pos)}
                                            <br />
                                            Fecha de entrada lab: {this.setBoolValue(desarrollador.pos)}
                                            <br />
                                            Fecha de salida lab: {this.setBoolValue(desarrollador.pos)}
                                        </CardText>
                                        <button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(desarrollador); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(desarrollador); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </CardBody>
                                </Card>
                            )
                        })}
                    </CardColumns>
                    {/* <table className="table-dev" border="2">
                        <thead>
                            <tr ALIGN="center">
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Compañia</th>
                                <th>Certificacion</th>
                                <th>email</th>
                                <th>phone</th>
                                <th>pos</th>
                                <th>Nombre del programa</th>
                                {/* <th>Desarrollador independiente?</th> */}
                    {/* <th>Servicios</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(desarrollador => {
                                return (
                                    <tr ALIGN="center">
                                        <td>{desarrollador.developer_id}</td>
                                        <td>{desarrollador.developer_name}</td>
                                        <td>{desarrollador.developer_company}</td>
                                        <td>{desarrollador.certification_id}</td>
                                        <td>{desarrollador.email}</td>
                                        <td>{desarrollador.phone}</td>
                                        <td>{desarrollador.pos}</td>
                                        <td>{desarrollador.program_name}</td>
                                        {/* <td>{desarrollador.independent}</td> */}

                    {/* <td>
                                            <button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(desarrollador); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                                            {"   "}
                                            <button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(desarrollador); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        </td> */}
                    {/* </tr>
                                )
                            })} */}
                    {/* </tbody>  */}
                    {/* </table>  */}
                    <div className="add-dev-form">
                        <form className='form-group'>
                            <label>ID</label>
                            <input type="text" placeholder='Developer id'></input>
                            <br />
                            <label>Name</label>
                            <input type="text" placeholder='Developer name'></input>
                            <br />
                            <label>Email</label>
                            <input type="text" placeholder='Developer email'></input>
                            <br />
                            <label>Phone</label>
                            <input type="text" placeholder='Developer Phone'></input>
                            <br />
                            <label>Certification</label>
                            <input type="text" placeholder='Certification id'></input>
                            <br />
                            <label>Programa</label>
                            <input type="text" placeholder='Program name'></input>
                            <br />
                            <label>Servicio</label>
                            <input type="text" placeholder='Services'></input>
                            <br />
                            <label>POS?</label>
                            <input type="checkbox"></input>
                            <label>Independiente?</label>
                            <input type="checkbox" ></input>
                            <br />
                            <label>Fecha Inicio</label>
                            <input type="date"></input>
                            <br />
                            <label>Fecha Final</label>
                            <input type="date"></input>
                            <br />
                            <button className="btn btn-success" onClick={() => this.peticionPost()}>Insertar</button>
                        </form>

                    </div>
                </div>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                            <br />
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form ? form.name : ''} />
                            <br />
                            <label htmlFor="nombre">Compañia</label>
                            <input className="form-control" type="text" name="company" id="company" onChange={this.handleChange} value={form ? form.company : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Certificacion</label>
                            <input className="form-control" type="text" name="certification" id="certification" onChange={this.handleChange} value={form ? form.certification : ''} />
                            <br />
                            <label htmlFor="nombre">Email</label>
                            <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={form ? form.email : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Telefono</label>
                            <input className="form-control" type="text" name="phone" id="phone" onChange={this.handleChange} value={form ? form.phone : ''} />
                            <br />
                            <label htmlFor="nombre">POS de prueba: </label>
                            <input className="form-check-input" type="checkbox" name="pos" id="pos" onChange={this.handleChange} value={form ? form.pos : ''} />
                            <br />
                            <br />
                            <label htmlFor="capital_bursatil">Nombre del programa</label>
                            <input className="form-control" type="text" name="program_name" id="program_name" onChange={this.handleChange} value={form ? form.program_name : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Desarrollador Independiente? </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />
                            <br />
                            <br />
                            <label htmlFor="capital_bursatil">SERVICIOS </label>
                            <br />
                            <label htmlFor="capital_bursatil">Web Pantalla CardNet 3DS </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Web Pantalla CardNet </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Api de consulta </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Api de consulta 3DS</label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Web Services </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Web Services 3DS </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Tokenizacion Autenticada </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Tokenizacion Directa </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />

                            <br />
                            <label htmlFor="capital_bursatil">Tokenizacion Sin Activacion </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Tokenizacion Anonima </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">ECRTI </label>
                            <input className="form-check-input" type="checkbox" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} />

                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {this.state.tipoModal === 'insertar' ?
                            <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                Insertar
                            </button> : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                Actualizar
                            </button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar a la empresa {form && form.nombre}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    }
}
export default PostDev;