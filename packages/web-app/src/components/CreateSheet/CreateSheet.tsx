import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSheet } from './api'

/** Component responsible for creating a sheet */
export default function CreateSheet() {
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const sheet = await createSheet()
        navigate(`/${sheet.pk}`)
      } catch (err: any) {
        alert(err.message)
      }
    })()
  }, [navigate])

  return <h1>Creating Sheet...</h1>
}
