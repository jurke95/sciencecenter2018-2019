import React, { Component, lazy, Suspense } from 'react';
import Background from './dashback.png';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'





var sectionStyle = {

  backgroundImage: `url(${Background})`,
  minHeight: '100vh',
  minWidth: '100vh',
  marginTop: 0,
  zIndex: 1,
  overflow: 'hidden',


};





// Main Chart

//Random Numbers





class Dashboard extends Component {




  render() {

    return (
      <div style={sectionStyle} >






      </div>
    );
  }
}

export default Dashboard;
