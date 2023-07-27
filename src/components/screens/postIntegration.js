import React, { Component } from 'react';

import '../styles/integraciones.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheckCircle, faEdit, faPlus, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Navbar } from '../Navbar';
import PostIntegration2 from '../postIntegration';

const url = "https://localhost:4000/api/empresas/";

class PostIntegration extends Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        modalCompletar: false,
        modalCertificar: false,
        modalMenu: false,
        dropOpen: false,
        form: {
            id: '',
            name: '',
            developer_id: '',
            servicio: '',
            status: '',
            production: '',
            start_lab: '',
            end_lab: '',
            cant_comercios: '',
            cant_pos: '',
            file: ''
        }

    }

    peticionGet = () => {
        let getdeveloper = 'http://localhost:4000/developer/find/integration'
        axios.get(getdeveloper).then(response => {
            this.setState({ data: response.data['result'] });
            console.log(response)
        }).catch(error => {
            console.log(error.message);
        })
    }


    peticionPost = async () => {
        let postdeveloper = 'http://localhost:4000/developer/integration'
        console.log('llegando')
        let config =
        {
            "headers": {
                "Content-Type": 'application/json'
            }
        }
        let payload = {
            "integration_id": this.state.form.id,
            "developer_id": this.state.form.developer_id,
            "company_name": this.state.form.name,
            "service_type": this.state.form.servicio,
            "status": this.state.form.status,
            "production_date": this.state.form.production,
            "start_lab_date": this.state.form.start_lab,
            "end_lab_date": this.state.form.end_lab,
            "cant_comercios": this.state.form.cant_comercios,
            "cant_pos": this.state.form.cant_pos
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
        axios.delete("http://localhost:4000/developer/integracion/" + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        })
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    seleccionarEmpresa = (desarrollador) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: desarrollador.integration_id

            }
        })
    }
    peticionComplete = () => {
        let url = "http://localhost:4000/developer/integracion/" + this.state.form.id + "/status/completado"
        console.log(url)
        axios.put(url).then(response => {
            this.setState({ modalCompletar: false });
            this.peticionGet();
        })
    }
    peticionCertificar = () => {
        let url = "http://localhost:4000/developer/integracion/" + this.state.form.id + "/status/certificado"
        console.log(url)
        axios.put(url).then(response => {
            this.setState({ modalCertificar: false });
            this.peticionGet();
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
    sendFile(file) {
        console.log(file);
    }


    render() {

        const { form } = this.state;
        return (

            <div className="main">
                <Navbar />
                <br /><br /><br />
                <div className='agregar'>
                <PostIntegration2/>
                    <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}><FontAwesomeIcon icon={faPlus} /> Agregar Integracion</button>
                </div>
                {/* <FormGroup>
                    <Label for="exampleFile">
                        File
                    </Label>
                    <Input
                        id="exampleFile"
                        name="file"
                        type="file"
                        value={ form.file } 
                    />
                    <FormText>
                        This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                    </FormText>
                </FormGroup> */}
                <button onClick={() => { this.sendFile(form.file) }}><FontAwesomeIcon icon={faEdit} /></button>
                <br /><br />
                <table className="tablaIntegraciones">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Desarrollador</th>
                            <th>Empresa</th>
                            <th>Servicio</th>
                            <th>Status</th>
                            <th>Fecha Entrada a produccion</th>
                            {/* <th>Fecha Entrada a laboratorio</th> */}
                            <th>Fecha finalizacion Desarrollo</th>
                            {/* <th>Cantidad de comercios</th> */}
                            {/* <th>Cantidad de POS</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(desarrollador => {
                            return (
                                <tr>
                                    <td>{desarrollador.integration_id}</td>
                                    <td>{desarrollador.developer_id}</td>
                                    <td>{desarrollador.company_name}</td>
                                    <td>{desarrollador.service_type}</td>
                                    <td>{desarrollador.status}</td>
                                    <td>{desarrollador.production_date}</td>
                                    <td>{desarrollador.start_lab_date}</td>
                                    <td>{desarrollador.end_lab_date}</td>
                                    <td>{desarrollador.cant_comercios}</td>
                                    <td>{desarrollador.cant_pos}</td>

                                    <td>

                                        <button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(desarrollador); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                                        {""}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(desarrollador); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        {""}
                                        <button className="btn btn-success" onClick={() => { this.seleccionarEmpresa(desarrollador); this.setState({ modalCompletar: true }) }}><FontAwesomeIcon icon={faCheckCircle} /></button>
                                        {""}
                                        <button className="btn btn-success" onClick={() => { this.seleccionarEmpresa(desarrollador); this.setState({ modalCertificar: true }) }}><FontAwesomeIcon icon={faArrowRight} /></button>


                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>



                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                            <br />
                            <label htmlFor="nombre">Nombre empresa</label>
                            <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form ? form.name : ''} />
                            <br />
                            <label htmlFor="nombre">ID Desarrollador</label>
                            <input className="form-control" type="text" name="developer_id" id="developer_id" onChange={this.handleChange} value={form ? form.developer : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Fecha de inicio:</label>
                            <br />
                            <input type="date" name="start_lab" step="1" min="2020-01-01" max="2024-12-31" onChange={this.handleChange} value={form ? form.start_lab : ''} />
                            <br />
                            <br />
                            <label htmlFor="nombre">Fecha Certificacion:</label>

                            <br />
                            <input type="date" name="end_lab" step="1" min="2020-01-01" max="2024-12-31" onChange={this.handleChange} value={form ? form.end_lab : ''} />
                            <br />
                            <br />
                            <label htmlFor="nombre">Fecha entrada a produccion:</label>
                            <br />
                            <input type="date" name="production" step="1" min="2020-01-01" max="2024-12-31" onChange={this.handleChange} value={form ? form.production : ''} />
                            <br />
                            <br />
                            <label htmlFor="capital_bursatil">Servicio</label>
                            <input className="form-control" type="text" name="servicio" id="servicio" onChange={this.handleChange} value={form ? form.servicio : ''} />
                            <br />
                            <label htmlFor="nombre">status:</label>
                            <br />
                            <input className="form-control" type="text" name="status" id='status' onChange={this.handleChange} value={form ? form.status : ''} />
                            <br />
                            <label htmlFor="nombre">cantidad de comercios:</label>
                            <br />
                            <input className="form-control" type="text" name="cant_comercios" id='cant_comercios' onChange={this.handleChange} value={form ? form.cant_comercios : ''} />
                            <br />
                            <label htmlFor="nombre">cantidad de POS:</label>
                            <br />
                            <input className="form-control" type="text" name="cant_pos" id='cant_pos' onChange={this.handleChange} value={form ? form.cant_pos : ''} />
                            <br />
                            <label htmlFor="nombre">Ejecutivo de cuentas:</label>
                            <br />
                            <input className="form-control" type="text" name="cant_pos" id='cant_pos' onChange={this.handleChange} value={form ? form.cant_pos : ''} />
                            <br />
                            <label htmlFor="nombre">Comentario:</label>
                            <br />
                            <input className="form-control" type="text" name="cant_pos" id='cant_pos' onChange={this.handleChange} value={form ? form.cant_pos : ''} />
                            <br />
                            <label htmlFor="nombre">Numero de ticket:</label>
                            <br />
                            <input className="form-control" type="text" name="cant_pos" id='cant_pos' onChange={this.handleChange} value={form ? form.cant_pos : ''} />

                            <br />
                            <label htmlFor="nombre">Ticket de PI: </label>
                            <input className="form-check-input" type="checkbox" name="pos" id="pos" onChange={this.handleChange} value={form ? form.pos : ''} />

                            <label htmlFor="nombre"> Ticket de PIA: </label>
                            <input className="form-check-input" type="checkbox" name="pos" id="pos" onChange={this.handleChange} value={form ? form.pos : ''} />

                            <label htmlFor="nombre"> Ticket de ITOP: </label>
                            <input className="form-check-input" type="checkbox" name="pos" id="pos" onChange={this.handleChange} value={form ? form.pos : ''} />
                            <br />
                            {/*
                            <label htmlFor="nombre">POS</label>
                            <input className="form-control" type="text" name="pos" id="pos" onChange={this.handleChange} value={form ? form.pos : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Nombre del programa</label>
                            <input className="form-control" type="text" name="program_name" id="program_name" onChange={this.handleChange} value={form ? form.program_name : ''} />
                            <br />
                            <label htmlFor="capital_bursatil">Desarrollador Independiente?</label>
                            <input className="form-control" type="text" name="developer" id="developer" onChange={this.handleChange} value={form ? form.independent : ''} /> */}
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
                        Estás seguro que deseas eliminar a la empresa? {form && form.nombre}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalCompletar}>
                    <ModalBody>
                        Estás seguro que deseas pasar a completado? {form && form.nombre}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={() => this.peticionComplete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalCompletar: false })}>No</button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalCertificar}>
                    <ModalBody>
                        Estás seguro que deseas pasar a certificado? {form && form.nombre}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={() => this.peticionCertificar()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalCertificar: false })}>No</button>
                    </ModalFooter>
                </Modal>

            </div>



        );
    }
}
export default PostIntegration;