import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.timeout =  0;
    this.state = {
      columnDefs: [
        { headerName: "ID", field: "_id", sortable: true, filter: true },
        { headerName: "First Name", field: "first_name", sortable: true, filter: true },
        { headerName: "Last Name", field: "last_name", sortable: true, filter: true },
        { headerName: "Email", field: "email", sortable: true, filter: true },
        { headerName: "Phone Number", field: "phone_number", sortable: true, filter: true }
      ],
      rowData: []
    }
  }

  componentDidMount() {
    this.searchCustomers();
  }

  render() {
    return (
      <div className="ag-theme-balham" style={ {height: '600px', width: '1020px'} }>
        <input 
          type="text" 
          onChange={ this.handleChange.bind(this) } 
          placeholder="Search..."
        />
        <AgGridReact
            enableServerSideSorting
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            pagination>
        </AgGridReact>
      </div>
    );
  }

  handleChange(e) {
    const keyword = e.target.value;

    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchCustomers(keyword);
    }, 300);

  }

  searchCustomers(keyword) {
    keyword = keyword || '';

    fetch('https://blaze-backend.herokuapp.com/api/customers/all?keyword='+keyword)
    .then(result => {
      return result.json()
    })
    .then(rowData => {
      return this.setState({rowData: rowData});      
    })
  }
}

export default App;
