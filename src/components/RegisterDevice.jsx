import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { useRouter } from 'next/router'

const RegisterDevice = () => {
  const router = useRouter()
  const [result, setResult] = React.useState('No result')
  const [delay, setDelay] = React.useState(500)

  const handleScan = (data) => {
    if(!data) return null;
    
    router.push(data.text)
  }

  const handleError = (err) => {
    console.error(err)
  }

  const previewStyle = {
    height: 240,
    width: 320,
  }

  return (
    <div>
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  )
}

export default RegisterDevice