"use server";

import db from "@/lib/db";
import {
  DoctorSchema,
  ServicesSchema,
  WorkingDaysSchema,
} from "@/lib/schema";
import { generateRandomColor } from "@/utils";
import { checkRole } from "@/utils/roles";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createNewDoctor(data: any) {
  try {
    const values = DoctorSchema.safeParse(data);

    const workingDaysValues = WorkingDaysSchema.safeParse(data?.work_schedule);

    if (!values.success || !workingDaysValues.success) {
      return {
        success: false,
        errors: true,
        message: "Please provide all required info",
      };
    }

    const validatedValues = values.data;
    const workingDayData = workingDaysValues.data!;

    const client = await clerkClient();

    const user = await client.users.createUser({
      emailAddress: [validatedValues.email],
      password: validatedValues.password,
      firstName: validatedValues.name.split(" ")[0],
      lastName: validatedValues.name.split(" ")[1],
      publicMetadata: { role: "doctor" },
    });

    delete validatedValues["password"];

    const doctor = await db.doctor.create({
      data: {
        ...validatedValues,
        id: user.id,
        city: validatedValues.city,
        state: validatedValues.state,
        zip: validatedValues.zip,
        npi_number: validatedValues.npi_number,
        years_in_practice: validatedValues.years_in_practice,
      },
    });

    await Promise.all(
      workingDayData?.map((el) =>
        db.workingDays.create({
          data: { ...el, doctor_id: doctor.id },
        })
      )
    );

    return {
      success: true,
      message: "Doctor added successfully",
      error: false,
    };
  } catch (error: any) {
    // Log the full error object for debugging
    console.log("Clerk error details:", error);

    // Try to extract a helpful message for the toast
    let message = "Something went wrong";
    if (error && typeof error === 'object' && 'errors' in error && Array.isArray(error.errors) && error.errors.length > 0) {
      message = error.errors.map((e: any) => e.message).join("; ");
    } else if (error && typeof error === 'object' && 'message' in error && error.message) {
      message = error.message;
    }

    return { error: true, success: false, message };
  }
}

export async function addNewService(data: any) {
  try {
    const isValidData = ServicesSchema.safeParse(data);

    const validatedData = isValidData.data;

    await db.services.create({
      data: { ...validatedData!, price: Number(data.price!) },
    });

    return {
      success: true,
      error: false,
      msg: `Service added successfully`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, msg: "Internal Server Error" };
  }
}