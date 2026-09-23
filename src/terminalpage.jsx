import React, { useState, useRef, useEffect } from 'react';

const files = {
  'about.md': "Hi, I'm a developer building terminal-styled portfolio websites!",
  'projects.md': '- Terminal Portfolio (React)\n- Medical AI Dashboard (Python)',
};

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'Welcome to the mock terminal ecosystem.',
    'Type "help" to see available commands.',
  ]);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(' ');
    const baseCmd = parts[0];
    const arg = parts[1];

    let output = '';

    switch (baseCmd) {
      case 'help':
        output = 'Available commands: help, ls, cat [filename], clear, date';
        break;
      case 'ls':
        output = Object.keys(files).join('    ');
        break;
      case 'cat':
        if (!arg) {
          output = 'Usage: cat [filename]';
        } else if (files[arg]) {
          output = files[arg];
        } else {
          output = `cat: ${arg}: No such file or directory`;
        }
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        output = '';
        break;
      default:
        output = `command not found: ${baseCmd}. Type "help" for options.`;
    }

    const promptLine = `guest@portfolio:~$ ${cmd}`;
    setHistory((prev) => [...prev, promptLine, ...(output ? [output] : [])]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '768px',
      margin: '0 auto',
      background: '#030712',
      border: '1px solid #1f2937',
      borderRadius: '8px',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
      padding: '16px',
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#4ade80',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Terminal Output Window */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '16px',
        whiteSpace: 'pre-wrap',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {history.map((line, index) => (
          <div
            key={index}
            style={{ color: line.startsWith('guest@') ? '#ffffff' : '#4ade80' }}
          >
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Input Prompt */}
      <div style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
        <span style={{ color: '#34d399', marginRight: '8px' }}>guest@portfolio:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#ffffff',
          }}
        />
      </div>
    </div>
  );
}