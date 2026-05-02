const STDLIB = new Set([
  '__future__','__main__','_thread','abc','aifc','argparse','array','ast',
  'asynchat','asyncio','asyncore','atexit','audioop','base64','bdb','binascii',
  'binhex','bisect','builtins','bz2','calendar','cgi','cgitb','chunk','cmath',
  'cmd','code','codecs','codeop','collections','colorsys','compileall',
  'concurrent','configparser','contextlib','contextvars','copy','copyreg',
  'cProfile','csv','ctypes','curses','dataclasses','datetime','dbm','decimal',
  'difflib','dis','doctest','email','encodings','enum','errno','faulthandler',
  'fcntl','filecmp','fileinput','fnmatch','fractions','ftplib','functools',
  'gc','getopt','getpass','gettext','glob','grp','gzip','hashlib','heapq',
  'hmac','html','http','idlelib','imaplib','imghdr','importlib','inspect',
  'io','ipaddress','itertools','json','keyword','lib2to3','linecache','locale',
  'logging','lzma','mailbox','mailcap','marshal','math','mimetypes','mmap',
  'modulefinder','multiprocessing','netrc','nis','nntplib','numbers',
  'operator','optparse','os','ossaudiodev','pathlib','pdb','pickle',
  'pickletools','pipes','pkgutil','platform','plistlib','poplib','posix',
  'posixpath','pprint','profile','pstats','pty','pwd','py_compile','pyclbr',
  'pydoc','queue','quopri','random','re','readline','reprlib','resource',
  'rlcompleter','runpy','sched','secrets','select','selectors','shelve',
  'shlex','shutil','signal','site','smtpd','smtplib','sndhdr','socket',
  'socketserver','spwd','sqlite3','ssl','stat','statistics','string',
  'stringprep','struct','subprocess','sunau','symtable','sys','sysconfig',
  'syslog','tabnanny','tarfile','telnetlib','tempfile','termios','test',
  'textwrap','threading','time','timeit','tkinter','token','tokenize',
  'tomllib','trace','traceback','tracemalloc','tty','turtle','turtledemo',
  'types','typing','unicodedata','unittest','urllib','uu','uuid','venv',
  'warnings','wave','weakref','webbrowser','wsgiref','xdrlib','xml',
  'xmlrpc','zipapp','zipfile','zipimport','zlib','zoneinfo','typing_extensions',
  'collections.abc','os.path','email.mime','xml.etree','xml.etree.ElementTree',
  'urllib.parse','urllib.request','urllib.error','http.client','http.server',
  'unittest.mock','concurrent.futures','importlib.metadata'
]);

const PIP_NAME_MAP = {
  'PIL':            'Pillow',
  'cv2':            'opencv-python',
  'sklearn':        'scikit-learn',
  'skimage':        'scikit-image',
  'bs4':            'beautifulsoup4',
  'yaml':           'PyYAML',
  'dotenv':         'python-dotenv',
  'wx':             'wxPython',
  'gi':             'PyGObject',
  'gtk':            'PyGTK',
  'usb':            'pyusb',
  'serial':         'pyserial',
  'Crypto':         'pycryptodome',
  'dateutil':       'python-dateutil',
  'attr':           'attrs',
  'toml':           'toml',
  'psutil':         'psutil',
  'pygame':         'pygame',
  'pydantic':       'pydantic',
  'aiohttp':        'aiohttp',
  'discord':        'discord.py',
  'telegram':       'python-telegram-bot',
  'tweepy':         'tweepy',
  'spacy':          'spacy',
  'nltk':           'nltk',
  'torch':          'torch',
  'tensorflow':     'tensorflow',
  'keras':          'keras',
  'transformers':   'transformers',
  'fastapi':        'fastapi',
  'uvicorn':        'uvicorn',
  'sqlalchemy':     'SQLAlchemy',
  'alembic':        'alembic',
  'celery':         'celery',
  'redis':          'redis',
  'pymongo':        'pymongo',
  'motor':          'motor',
  'boto3':          'boto3',
  'botocore':       'botocore',
  'google':         'google-cloud',
  'azure':          'azure',
  'paramiko':       'paramiko',
  'fabric':         'fabric',
  'cryptography':   'cryptography',
  'jwt':            'PyJWT',
  'passlib':        'passlib',
  'bcrypt':         'bcrypt',
  'httpx':          'httpx',
  'starlette':      'starlette',
  'pydantic':       'pydantic',
  'typer':          'typer',
  'click':          'click',
  'rich':           'rich',
  'loguru':         'loguru',
  'pendulum':       'pendulum',
  'arrow':          'arrow',
  'pytz':           'pytz',
  'humanize':       'humanize',
  'tqdm':           'tqdm',
  'colorama':       'colorama',
  'termcolor':      'termcolor',
  'tabulate':       'tabulate',
  'prettytable':    'prettytable',
  'openpyxl':       'openpyxl',
  'xlrd':           'xlrd',
  'xlwt':           'xlwt',
  'reportlab':      'reportlab',
  'pypdf2':         'PyPDF2',
  'PyPDF2':         'PyPDF2',
  'fpdf':           'fpdf2',
  'docx':           'python-docx',
  'pptx':           'python-pptx',
  'markdown':       'Markdown',
  'pygments':       'Pygments',
  'jinja2':         'Jinja2',
  'mako':           'Mako',
  'lxml':           'lxml',
  'selenium':       'selenium',
  'playwright':     'playwright',
  'scrapy':         'Scrapy',
  'mechanize':      'mechanize',
  'httplib2':       'httplib2',
  'decouple':       'python-decouple',
};

const textarea      = document.getElementById('import-input');
const editorLines   = document.getElementById('editor-lines');
const btnAnalyze    = document.getElementById('btn-analyze');
const btnClear      = document.getElementById('btn-clear');
const btnExample    = document.getElementById('btn-example');
const btnDownload   = document.getElementById('btn-download');
const resultsSection = document.getElementById('results-section');
const packagesList  = document.getElementById('packages-list');
const countInstall  = document.getElementById('count-install');
const countBuiltin  = document.getElementById('count-builtin');
const countTotal    = document.getElementById('count-total');
const previewCode   = document.getElementById('preview-code');
const downloadDesc  = document.getElementById('download-desc');
const filterTabs    = document.querySelectorAll('.filter-tab');

const EXAMPLE = `import os
import sys
import json
import requests
import numpy as np
import pandas as pd
from flask import Flask, render_template
from PIL import Image
import matplotlib.pyplot as plt
from bs4 import BeautifulSoup
import datetime
import re
import sqlalchemy
from dotenv import load_dotenv
import tqdm
import yaml`;

function updateLineNumbers() {
  const lines = textarea.value.split('\n').length;
  editorLines.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
}
textarea.addEventListener('input', updateLineNumbers);
updateLineNumbers();

btnExample.addEventListener('click', () => {
  textarea.value = EXAMPLE;
  updateLineNumbers();
  textarea.focus();
});

btnClear.addEventListener('click', () => {
  textarea.value = '';
  updateLineNumbers();
  resultsSection.classList.add('hidden');
  textarea.focus();
});

function parseImports(code) {
  const lines = code.split('\n');
  const imports = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const importMatch = trimmed.match(/^import\s+(.+)/);
    if (importMatch) {
      const parts = importMatch[1].split(',');
      for (const part of parts) {
        const name = part.trim().split(/\s+as\s+/)[0].trim();
        const topLevel = name.split('.')[0];
        if (topLevel) imports.push({ raw: trimmed, module: topLevel });
      }
      continue;
    }

    const fromMatch = trimmed.match(/^from\s+([\w.]+)\s+import\s+/);
    if (fromMatch) {
      const topLevel = fromMatch[1].split('.')[0];
      if (topLevel) imports.push({ raw: trimmed, module: topLevel });
    }
  }

  return imports;
}

function deduplicateImports(imports) {
  const seen = new Map();
  for (const imp of imports) {
    if (!seen.has(imp.module)) {
      seen.set(imp.module, imp);
    }
  }
  return Array.from(seen.values());
}

function classifyImport(moduleName) {
  if (STDLIB.has(moduleName)) return 'builtin';
  for (const std of STDLIB) {
    if (moduleName.startsWith(std + '.')) return 'builtin';
  }
  return 'install';
}

function getPipName(moduleName) {
  return PIP_NAME_MAP[moduleName] || moduleName;
}

function generateBat(toInstall) {
  const lines = [];
  lines.push('@echo off');
  lines.push('echo ╔══════════════════════════════════════╗');
  lines.push('echo ║         PyImport  setup.bat           ║');
  lines.push('echo ╚══════════════════════════════════════╝');
  lines.push('echo.');
  lines.push('echo Sprawdzam czy Python jest zainstalowany...');
  lines.push('python --version >nul 2>&1');
  lines.push('if %errorlevel% neq 0 (');
  lines.push('  echo [BLAD] Python nie jest zainstalowany!');
  lines.push('  echo Pobierz Python ze strony: https://python.org');
  lines.push('  pause');
  lines.push('  exit /b 1');
  lines.push(')');
  lines.push('echo [OK] Python wykryty.');
  lines.push('echo.');

  if (toInstall.length === 0) {
    lines.push('echo Wszystkie importy sa wbudowane w Pythona!');
    lines.push('echo Nie trzeba nic instalowac.');
  } else {
    lines.push(`echo Instaluje ${toInstall.length} pakiet(ow)...`);
    lines.push('echo.');
    for (const pkg of toInstall) {
      lines.push(`echo [pip] Instaluje: ${pkg}`);
      lines.push(`python -m pip install ${pkg} --quiet`);
      lines.push(`if %errorlevel% neq 0 (`);
      lines.push(`  echo [BLAD] Nie udalo sie zainstalowac: ${pkg}`);
      lines.push(`) else (`);
      lines.push(`  echo [OK] ${pkg} zainstalowany`);
      lines.push(`)`);
    }
    lines.push('echo.');
    lines.push('echo ╔══════════════════════════════════════╗');
    lines.push('echo ║   Instalacja zakonczona pomyslnie!   ║');
    lines.push('echo ╚══════════════════════════════════════╝');
  }

  lines.push('echo.');
  lines.push('pause');
  return lines.join('\r\n');
}

function renderPackageItem(imp, type, index) {
  const pipName = getPipName(imp.module);
  const div = document.createElement('div');
  div.className = `pkg-item ${type}`;
  div.dataset.type = type;
  div.style.animationDelay = `${index * 40}ms`;

  div.innerHTML = `
    <div class="pkg-left">
      <span class="pkg-status">${type === 'install' ? '📦' : '✅'}</span>
      <div>
        <div class="pkg-name">${escapeHtml(type === 'install' ? pipName : imp.module)}</div>
        <div class="pkg-raw">${escapeHtml(imp.raw)}</div>
      </div>
    </div>
    <span class="pkg-badge">${type === 'install' ? 'pip install' : 'wbudowany'}</span>
  `;
  return div;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    document.querySelectorAll('.pkg-item').forEach(item => {
      if (filter === 'all') {
        item.classList.remove('pkg-hidden');
      } else if (filter === 'install') {
        item.classList.toggle('pkg-hidden', item.dataset.type !== 'install');
      } else {
        item.classList.toggle('pkg-hidden', item.dataset.type !== 'builtin');
      }
    });
  });
});

btnAnalyze.addEventListener('click', () => {
  const code = textarea.value.trim();

  if (!code) {
    textarea.style.border = '1px solid var(--red)';
    setTimeout(() => { textarea.style.border = ''; }, 1200);
    return;
  }

  const raw = parseImports(code);
  const unique = deduplicateImports(raw);

  if (unique.length === 0) {
    alert('Nie znaleziono żadnych importów. Upewnij się, że wklejasz poprawny kod Pythona.');
    return;
  }

  const toInstall = [];
  const builtin   = [];

  for (const imp of unique) {
    const type = classifyImport(imp.module);
    if (type === 'install') toInstall.push(imp);
    else                    builtin.push(imp);
  }

  countInstall.textContent = toInstall.length;
  countBuiltin.textContent = builtin.length;
  countTotal.textContent   = unique.length;

  packagesList.innerHTML = '';
  filterTabs.forEach(t => t.classList.remove('active'));
  filterTabs[0].classList.add('active');

  let idx = 0;
  for (const imp of toInstall) {
    packagesList.appendChild(renderPackageItem(imp, 'install', idx++));
  }
  for (const imp of builtin) {
    packagesList.appendChild(renderPackageItem(imp, 'builtin', idx++));
  }

  if (unique.length === 0) {
    packagesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <p>Brak wykrytych importów</p>
      </div>`;
  }

  const pipNames = toInstall.map(imp => getPipName(imp.module));
  const batContent = generateBat(pipNames);
  previewCode.textContent = batContent;

  if (toInstall.length === 0) {
    downloadDesc.textContent = 'Wszystkie pakiety są wbudowane w Pythona — nie trzeba nic instalować.';
    btnDownload.disabled = false;
  } else {
    downloadDesc.textContent = \`Plik zainstaluje \${toInstall.length} pakiet(ów): \${pipNames.slice(0,5).join(', ')}\${pipNames.length > 5 ? '...' : ''}.\`;
    btnDownload.disabled = false;
  }

  btnDownload._batContent = batContent;

  resultsSection.classList.remove('hidden');

  setTimeout(() => {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
});

btnDownload.addEventListener('click', () => {
  const content = btnDownload._batContent;
  if (!content) return;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'setup.bat';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  const original = btnDownload.innerHTML;
  btnDownload.innerHTML = '<span>✅</span> Pobrano!';
  btnDownload.style.background = 'linear-gradient(135deg, #059669, #10b981)';
  setTimeout(() => {
    btnDownload.innerHTML = original;
    btnDownload.style.background = '';
  }, 2000);
});

textarea.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = textarea.selectionStart;
    const end   = textarea.selectionEnd;
    textarea.value = textarea.value.slice(0, start) + '    ' + textarea.value.slice(end);
    textarea.selectionStart = textarea.selectionEnd = start + 4;
    updateLineNumbers();
  }
  if (e.key === 'Enter' && e.ctrlKey) {
    btnAnalyze.click();
  }
});
