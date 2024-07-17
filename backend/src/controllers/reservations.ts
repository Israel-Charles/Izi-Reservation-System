import { Request, Response } from "express";

// /api/resources/:resourceId/reservations
export const addReservation = async (req: Request, res: Response) => {};

// /api/resources/:resourceId/reservations
export const getAllReservations = async (req: Request, res: Response) => {};

// /api/resources/:resourceId/reservations/:reservationId
export const getReservationById = async (req: Request, res: Response) => {};

// /api/resources/:resourceId/reservations/:reservationId
export const updateReservation = async (req: Request, res: Response) => {};

// /api/resources/:resourceId/reservations/:reservationId
export const cancelReservation = async (req: Request, res: Response) => {};
