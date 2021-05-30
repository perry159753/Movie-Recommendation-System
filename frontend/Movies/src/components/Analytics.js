import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,PieChart, Pie, Sector, Cell } from 'recharts';
import '../../src/index.css'
const data = [
  {
    name: 'Monday',
    mv: 4000,
    tv: 2400,
    amt: 2400,
  },
  {
    name: 'Tuesday',
    mv: 3000,
    tv: 1398,
    amt: 2210,
  },
  {
    name: 'Wedensday',
    mv: 2000,
    tv: 9800,
    amt: 2290,
  },
  {
    name: 'Thrusday',
    mv: 2780,
    tv: 3908,
    amt: 2000,
  },
  {
    name: 'Friday',
    mv: 1890,
    tv: 4800,
    amt: 2181,
  },
  {
    name: 'Saturday',
    mv: 2390,
    tv: 3800,
    amt: 2500,
  },
  {
    name: 'Sunday',
    mv: 3490,
    tv: 4300,
    amt: 2100,
  },
];



const data01 = [
  { name: 'action', value: 400 }, { name: 'action', value: 300 },
  { name: 'romance', value: 300 }, { name: 'romance', value: 200 },
  { name: 'horror', value: 278 }, { name: 'horror', value: 189 },
];

const data02 = [
  { name: 'suspense', value: 2400 }, { name: 'suspense', value: 4567 },
  { name: 'documentry', value: 1398 }, { name: 'documentry', value: 9800 },
  { name: 'tv series', value: 3908 }, { name: 'tv series', value: 4800 },
];


export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <React.Fragment>
        <div className='mainDiv'>
          <div className='left'>
          <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="mv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="tv" stroke="#82ca9d" />
      </LineChart>
          </div>
          <div className='right'>
          <PieChart width={400} height={400}>
        <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
        <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
        <Tooltip />
      </PieChart>
          </div>
        </div>

      </React.Fragment>
      
    );
  }
}
