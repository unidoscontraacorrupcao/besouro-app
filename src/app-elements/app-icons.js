import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<iron-iconset-svg size="24" name="app">
<svg><defs>
<g id="tune"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></g>
<g id="filter"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g>
<g id="chart"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="swap-horiz"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g>
<g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></g>
<g id="zoom-out"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></g>
<g id="fit-img"><path d="M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
<g id="library-books"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"></path></g>
<g id="videocam"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></g>
<g id="volume-up"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g>
<g id="insert-drive-file"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></g>
<g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
<g id="insert-photo"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></g>
<g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>
<g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>
<g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
<g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
<g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
<g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>
<g id="file-upload"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>
<g id="help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>
<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
<g id="more-horiz"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
<g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>
<g id="swap-vertical-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g>
<g id="view-list"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g>
<g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="glossary"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="share"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path></g>
<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>
<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
<g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
<g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>
<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="done-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>
<g id="mic"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path></g>
<g id="edit">
  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
</g>
<g id="watch-later"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="play-circle-outline"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="pause-circle-outline"><path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"></path></g>
<g id="thumb-up"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>
<g id="chat-bubble-outline"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"></path></g>
<g id="share"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path></g>
<g id="assistant-photo"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>
<g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="thumb-down"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></g>
<g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>
<g id="person-pin"><path d="M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3.3c1.49 0 2.7 1.21 2.7 2.7 0 1.49-1.21 2.7-2.7 2.7-1.49 0-2.7-1.21-2.7-2.7 0-1.49 1.21-2.7 2.7-2.7zM18 16H6v-.9c0-2 4-3.1 6-3.1s6 1.1 6 3.1v.9z"></path></g>
<g id="comment"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path></g>
<g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="audiotrack"><path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"></path></g>
<g id="public"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></g>
<g id="facebook" transform="matrix(1.33333,0,0,1.33333,-188,-166.667)"><path d="M153.988,125L151.271,125C149.659,125 147.865,125.718 147.865,128.193C147.873,129.055 147.865,129.881 147.865,130.81L146,130.81L146,133.953L147.923,133.953L147.923,143L151.457,143L151.457,133.893L153.789,133.893L154,130.801L151.396,130.801C151.396,130.801 151.402,129.426 151.396,129.026C151.396,128.048 152.357,128.104 152.415,128.104C152.872,128.104 153.761,128.106 153.989,128.104L153.989,125L153.988,125Z" style="fill-rule:nonzero;"></path></g>
<g id="twitter" transform="matrix(0.487693,0,0,0.487693,-0.249122,-0.670432)">
        <path d="M49.722,10.72C47.912,11.523 45.966,12.064 43.923,12.312C46.004,11.058 47.611,9.082 48.362,6.723C46.409,7.88 44.246,8.721 41.947,9.172C40.107,7.212 37.485,5.987 34.578,5.987C29.004,5.987 24.482,10.509 24.482,16.083C24.482,16.872 24.572,17.646 24.745,18.382C16.354,17.961 8.917,13.935 3.936,7.828C3.065,9.322 2.569,11.058 2.569,12.913C2.569,16.414 4.349,19.501 7.061,21.312C5.401,21.259 3.846,20.808 2.486,20.05C2.486,20.095 2.486,20.132 2.486,20.177C2.486,25.068 5.965,29.147 10.584,30.078C9.736,30.311 8.849,30.431 7.925,30.431C7.272,30.431 6.641,30.371 6.025,30.251C7.309,34.255 11.035,37.184 15.452,37.26C12.004,39.971 7.647,41.579 2.915,41.579C2.096,41.579 1.3,41.534 0.511,41.444C4.973,44.306 10.284,45.974 15.986,45.974C34.555,45.974 44.712,30.589 44.712,17.255C44.712,16.812 44.704,16.376 44.681,15.941C46.657,14.528 48.37,12.748 49.722,10.72" style="fill-rule:nonzero;"></path>
    </g>
    <g id="instagram" transform="matrix(0.537383,0,0,0.537383,-2.34813,-2.13318)">
        <path d="M48.1,26.3C48.1,30.6 48.1,33.5 48,35.1C47.8,39 46.7,42 44.5,44.1C42.3,46.2 39.4,47.4 35.5,47.6C33.9,47.7 30.9,47.7 26.7,47.7C22.4,47.7 19.5,47.7 17.9,47.6C14,47.4 11,46.3 8.9,44.1C6.8,42 5.6,39 5.4,35.1C5.3,33.5 5.3,30.5 5.3,26.3C5.3,22.1 5.3,19.1 5.4,17.5C5.6,13.6 6.7,10.6 8.9,8.5C11,6.4 14,5.2 17.9,5C19.5,4.9 22.5,4.9 26.7,4.9C31,4.9 33.9,4.9 35.5,5C39.4,5.2 42.4,6.3 44.5,8.5C46.6,10.7 47.8,13.6 48,17.5C48,19.1 48.1,22 48.1,26.3ZM28.8,8.7L21.7,8.7C21,8.7 20.1,8.7 19,8.8C17.9,8.8 16.9,8.9 16.1,9.1C15.3,9.2 14.6,9.4 14.1,9.6C13.2,10 12.4,10.5 11.6,11.2C10.9,11.9 10.4,12.7 10,13.7C9.8,14.2 9.6,14.9 9.5,15.7C9.4,16.5 9.3,17.4 9.2,18.6C9.2,19.7 9.1,20.6 9.1,21.3L9.1,31.3C9.1,32 9.1,32.9 9.2,34C9.2,35.1 9.3,36.1 9.5,36.9C9.7,37.7 9.8,38.4 10,38.9C10.4,39.8 10.9,40.6 11.6,41.4C12.3,42.1 13.1,42.6 14.1,43C14.6,43.2 15.3,43.4 16.1,43.5C16.9,43.6 17.8,43.7 19,43.8C20.2,43.9 21,43.9 21.7,43.9L31.7,43.9C32.4,43.9 33.3,43.9 34.4,43.8C35.5,43.8 36.5,43.7 37.3,43.5C38.1,43.4 38.8,43.2 39.3,43C40.2,42.6 41,42.1 41.8,41.4C42.5,40.7 43,39.9 43.4,38.9C43.6,38.4 43.8,37.7 43.9,36.9C44,36.1 44.1,35.2 44.2,34C44.2,32.9 44.3,32 44.3,31.3L44.3,21.3C44.3,20.6 44.3,19.7 44.2,18.6C44.2,17.5 44.1,16.5 43.9,15.7C43.8,14.9 43.6,14.2 43.4,13.7C43,12.8 42.5,12 41.8,11.2C41.1,10.5 40.3,10 39.3,9.6C38.8,9.4 38.1,9.2 37.3,9.1C36.5,9 35.6,8.9 34.4,8.8C33.3,8.8 32.4,8.7 31.7,8.7C31.1,8.7 30.1,8.7 28.8,8.7ZM34.4,18.5C36.5,20.6 37.6,23.2 37.6,26.3C37.6,29.4 36.5,31.9 34.4,34.1C32.3,36.2 29.7,37.3 26.6,37.3C23.5,37.3 21,36.2 18.8,34.1C16.7,32 15.6,29.4 15.6,26.3C15.6,23.2 16.7,20.7 18.8,18.5C20.9,16.4 23.5,15.3 26.6,15.3C29.7,15.3 32.3,16.3 34.4,18.5ZM31.7,31.3C33.1,29.9 33.8,28.2 33.8,26.3C33.8,24.4 33.1,22.6 31.7,21.2C30.3,19.8 28.6,19.1 26.6,19.1C24.6,19.1 22.9,19.8 21.5,21.2C20.1,22.6 19.4,24.3 19.4,26.3C19.4,28.3 20.1,30 21.5,31.3C22.9,32.7 24.6,33.4 26.6,33.4C28.6,33.4 30.3,32.7 31.7,31.3ZM39.9,13C40.4,13.5 40.7,14.1 40.7,14.8C40.7,15.5 40.4,16.1 39.9,16.6C39.4,17.1 38.8,17.4 38.1,17.4C37.4,17.4 36.8,17.1 36.3,16.6C35.8,16.1 35.5,15.5 35.5,14.8C35.5,14.1 35.8,13.5 36.3,13C36.8,12.5 37.4,12.2 38.1,12.2C38.8,12.2 39.4,12.5 39.9,13Z" style="fill-rule:nonzero;"></path>
    </g>
    <g id="telegram" transform="matrix(1.52338,0,0,1.52338,-6.14785,-6.54805)">
        <path d="M17.654,6.568C18.055,6.606 18.346,6.951 18.311,7.357C17.703,10.904 16.807,14.395 16.054,17.914C15.935,18.374 15.397,18.6 14.984,18.352L11.449,16.019L9.853,17.688C9.48,17.99 8.906,17.846 8.727,17.392L7.482,13.78L4.514,12.693C4.021,12.439 4.008,11.689 4.51,11.426C8.726,9.643 13.084,8.216 17.371,6.612C17.451,6.586 17.46,6.566 17.654,6.568Z" style="fill-rule:nonzero;"></path>
    </g>
    <g id="clipboard"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>
    <g id="whatsapp" transform="matrix(0.266667,0,0,0.266667,0,0)">
        <path d="M90,43.841C90,68.054 70.221,87.682 45.818,87.682C38.071,87.682 30.793,85.702 24.461,82.227L0,90L7.975,66.478C3.952,59.872 1.635,52.124 1.635,43.841C1.635,19.628 21.416,0 45.818,0C70.223,0 90,19.628 90,43.841ZM45.818,6.982C25.334,6.982 8.672,23.517 8.672,43.841C8.672,51.906 11.301,59.375 15.748,65.451L11.107,79.14L25.382,74.603C31.247,78.454 38.273,80.7 45.819,80.7C66.3,80.7 82.965,64.167 82.965,43.843C82.965,23.519 66.301,6.982 45.818,6.982ZM68.129,53.938C67.856,53.491 67.135,53.221 66.053,52.684C64.969,52.147 59.643,49.546 58.653,49.189C57.66,48.831 56.936,48.651 56.215,49.726C55.494,50.802 53.418,53.221 52.785,53.938C52.153,54.657 51.522,54.747 50.438,54.209C49.356,53.672 45.867,52.536 41.73,48.876C38.511,46.028 36.337,42.512 35.705,41.435C35.074,40.36 35.639,39.779 36.18,39.244C36.668,38.762 37.264,37.989 37.805,37.362C38.348,36.734 38.528,36.287 38.887,35.569C39.25,34.852 39.069,34.225 38.797,33.686C38.527,33.149 36.359,27.861 35.457,25.709C34.555,23.559 33.654,23.917 33.021,23.917C32.39,23.917 31.667,23.827 30.945,23.827C30.223,23.827 29.049,24.096 28.056,25.171C27.064,26.247 24.267,28.847 24.267,34.134C24.267,39.422 28.146,44.531 28.689,45.247C29.23,45.963 36.179,57.167 47.189,61.47C58.2,65.771 58.2,64.336 60.186,64.156C62.17,63.977 66.592,61.557 67.498,59.049C68.398,56.537 68.398,54.386 68.129,53.938Z" style="fill-rule:nonzero;"></path>
    </g>
<image id="google" width="24px" height="24px" xlink:href="data:image/png;base64,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"></image>
<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>
<g id="radio-button-unchecked"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="radio-button-checked"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="timeline"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></g>
<g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
<g id="stars"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path></g>
<g id="notifications"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></g>
</defs></svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer.content);
