import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// 解决 Jest 27+ 中的 TextEncoder/TextDecoder 问题
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
