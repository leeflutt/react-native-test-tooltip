import TooltipWrapper from './components/TooltipWrapper';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export default TooltipWrapper;
