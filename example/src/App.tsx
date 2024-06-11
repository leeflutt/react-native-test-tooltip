import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import TooltipWrapper from 'react-native-test-tooltip';
import { TooltipArrowDirections } from '../../src/Enum';
import { useEffect, useState } from 'react';

export default function App() {
  const [isSubtitleTPVisible, setIsSubtitleTPVisible] = useState(false);
  const [is1stTooltipVisible, setIs1stTooltipVisible] = useState(false);
  const [is2ndTooltipVisible, setIs2ndTooltipVisible] = useState(false);
  const [is3rdTooltipVisible, setIs3rdTooltipVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsSubtitleTPVisible(true);
      setTimeout(() => setIsSubtitleTPVisible(false), 3000);
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Démo Flash Tech Tooltips</Text>
          <TooltipWrapper
            tooltipPosition={TooltipArrowDirections.BOTTOM_RIGHT}
            isTooltipVisible={isSubtitleTPVisible}
            title="Juste comme ça"
            style={{ marginBottom: 200 }}
          >
            <TouchableOpacity onPress={() => setIsSubtitleTPVisible(false)}>
              <Text style={styles.subtitle}>Comment ça marche ?</Text>
            </TouchableOpacity>
          </TooltipWrapper>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 20 }}>
          <TooltipWrapper
            tooltipPosition={TooltipArrowDirections.RIGHT}
            isTooltipVisible={is1stTooltipVisible}
            title="1er tooltip"
            content="J'espère que cette démonstration vous plaît, allez mettre des stars sur ma lib"
            style={{ marginBottom: 40, alignSelf: 'flex-start' }}
            onCloseTooltip={() => setIs1stTooltipVisible(false)}
          >
            <TouchableOpacity
              style={styles.exampleButton}
              onPress={() => setIs1stTooltipVisible(!is1stTooltipVisible)}
            >
              <Text style={{ color: 'white', fontSize: 19 }}>Exemple 1</Text>
            </TouchableOpacity>
          </TooltipWrapper>

          <TooltipWrapper
            tooltipPosition={TooltipArrowDirections.LEFT}
            isTooltipVisible={is2ndTooltipVisible}
            title="Bouton d'exemple"
            style={{ marginBottom: 40, alignSelf: 'flex-end' }}
            hidePointer
          >
            <TouchableOpacity
              style={styles.exampleButton}
              onPress={() => setIs2ndTooltipVisible(!is2ndTooltipVisible)}
            >
              <Text style={{ color: 'white', fontSize: 19 }}>Exemple 2</Text>
            </TouchableOpacity>
          </TooltipWrapper>

          <TooltipWrapper
            tooltipPosition={TooltipArrowDirections.BOTTOM_CENTER}
            isTooltipVisible={is3rdTooltipVisible}
            title="3eme tooltip et pas des moindres"
            content="Ça c'est le tooltip Pro Max, mettez-moi des stars sur GitHub"
            style={{ marginBottom: 40, alignSelf: 'center' }}
            onCloseTooltip={() => setIs3rdTooltipVisible(false)}
            displayActionButton
          >
            <TouchableOpacity
              style={styles.exampleButton}
              onPress={() => setIs3rdTooltipVisible(!is3rdTooltipVisible)}
            >
              <Text style={{ color: 'white', fontSize: 19 }}>Exemple 2</Text>
            </TouchableOpacity>
          </TooltipWrapper>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  container: {
    marginVertical: 10,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
  exampleButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
  },
});
