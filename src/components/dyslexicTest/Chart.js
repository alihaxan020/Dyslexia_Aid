import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {VictoryPie, VictoryLabel} from 'victory-native';
import {Svg} from 'react-native-svg';
const {width, height} = Dimensions.get('screen');
const Chart = () => {
  return (
    <View>
      <Svg>
        <VictoryPie
          standalone={false}
          width={width}
          height={height * 0.4}
          startAngle={90}
          endAngle={450}
          labelRadius={(width * 0.4) / 2}
          responsive={true}
          percent={true}
          colorScale={['tomato', 'orange', 'gold']}
          innerRadius={width * 0.15}
          data={[
            {x: 'Verbal', y: 35},
            {x: 'Written', y: 40},
            {x: 'Assessment', y: 55},
          ]}
          labels={({datum}) => `${((datum.y / 130) * 100).toFixed(0)} %`}
          style={{
            labels: {fontSize: 20, fontWeight: 'bold'},
            parent: {
              elevation: 3,
            },
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{fontSize: 20, fontWeight: 'bold'}}
          x={width * 0.5}
          y={height * 0.2}
          text="Test"
        />
      </Svg>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({});
