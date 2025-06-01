"use client";

import { useEffect, useState } from "react";
import { Input } from "@/app/components/components/ui/input";
import { Button } from "@/app/components/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/components/ui/card";
import Layout from "../layout-bar";
import { toast } from "sonner";
import { useLocation } from "@/hooks/useLocations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/components/ui/select";
import DeleteLocationDialog from "../components/components/dialog/locationDeleteDialog";
import LocationDialog from "../components/components/dialog/locationDialog";
import { WorkHours } from "@/types/Location";
import { Location } from "@/types/Location";
import { FlagOff, Trash } from "lucide-react";

export default function WorkHoursPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  );
  const [locationToDelete, setLocationToDelete] = useState<Location | null>(
    null
  );
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [workHoursList, setWorkHoursList] = useState<WorkHours[]>([]);
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const {
    getLocations,
    createLocation,
    createWorkHours,
    finishLocation,
    deleteLocation,
    deleteWorksHours,
  } = useLocation();

  const reloadLocations = async () => {
    const data = await getLocations();
    setLocations(data);
  };

  useEffect(() => {
    reloadLocations();
  }, []);

  const handleAddLocation = () => {
    setOpenLocationDialog(true);
  };

  const handleSaveLocation = async (location: Location) => {
    const locationRequest = {
      Location: {
        id: 0,
        description: location?.description,
        isFinished: 0,
      },
    };
    await createLocation(locationRequest);
    await reloadLocations();
    setOpenLocationDialog(false);
    setSelectedLocationId(location.id);
  };

  const handleAddWorkHours = async () => {
    const selectedLocation = locations.find(
      (loc) => loc.id === selectedLocationId
    );

    if (!selectedLocation || selectedLocation.isFinished) {
      toast.error(
        "Essa localização já foi finalizada e não pode ser alterada."
      );
      return;
    }

    if (!selectedLocationId || !hours || !date) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const parsedHours = parseInt(hours);
    if (isNaN(parsedHours) || parsedHours <= 0) {
      toast.error("Informe um número válido de horas.");
      return;
    }

    const workHoursRequest = {
      WorkHours: {
        locationId: selectedLocationId,
        hours: parsedHours,
        date,
      },
    };
    await createWorkHours(workHoursRequest);
    await reloadLocations();
    const newEntry: WorkHours = {
      locationId: selectedLocationId,
      hours: parsedHours,
      date,
    };

    setWorkHoursList([...workHoursList, newEntry]);

    setHours("");
    setDate("");
  };

  const handleDeleteWorkHour = async (id: number) => {
    const workHoursRequest = {
      WorkHours: {
        id: id,
      },
    };
    await deleteWorksHours(workHoursRequest);
    await reloadLocations();
  };

  const handleFinishLocation = async (id: number) => {
    const locationRequest = {
      Location: {
        id: id,
        description: "",
        isFinished: 1,
      },
    };
    await finishLocation(locationRequest);
    await reloadLocations();
  };

  const handleDeleteLocation = async (id: number) => {
    const locationRequest = {
      Location: {
        id: id,
        description: "",
        isFinished: 0,
      },
    };
    await deleteLocation(locationRequest);
    await reloadLocations();
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10 space-y-6">
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-lg rounded-xl bg-white">
            <CardHeader className="flex flex-col items-center text-center">
              <CardTitle className="text-2xl font-bold card-foreground">
                ALMEIDA PINTURAS
              </CardTitle>
              <CardDescription className="card-foreground">
                Horas trabalhadas
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={selectedLocationId?.toString()}
              onValueChange={(value) => setSelectedLocationId(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um local" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id.toString()}>
                    {loc.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="w-auto" onClick={handleAddLocation}>
              Adicionar Local
            </Button>
          </div>

          <Input
            type="number"
            placeholder="Horas trabalhadas"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Data"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleAddWorkHours}
            disabled={
              !selectedLocationId ||
              locations.find((l) => l.id === selectedLocationId)?.isFinished ===
                1
            }
          >
            Adicionar Horas
          </Button>
        </div>

        <Card className="shadow-lg rounded-xl bg-white p-6">
          <div className="pt-6">
            <h2 className="text-lg font-semibold mb-2">
              Registros por Localização
            </h2>
            {locations.length === 0 ? (
              <p className="text-gray-500">Nenhum local cadastrado ainda.</p>
            ) : (
              <ul className="space-y-3">
                {locations.map((location, index) => (
                  <li
                    key={location.id}
                    className="bg-gray-100 p-3 rounded-lg shadow cursor-pointer"
                    onClick={() =>
                      setExpandedIndex(index === expandedIndex ? null : index)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {location.description}
                        {location.isFinished === 1 && (
                          <span className="ml-2 text-sm text-green-600 font-semibold">
                            (Finalizada)
                          </span>
                        )}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {location.workHours?.reduce(
                            (total, wh) => total + wh.hours,
                            0
                          )}{" "}
                          horas
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFinishLocation(location.id);
                          }}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FlagOff size={24} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (location.isFinished) {
                              toast.error(
                                "Localização finalizada não pode ser excluída."
                              );
                              return;
                            }
                            setLocationToDelete(location);
                          }}
                          className={`${
                            location.isFinished
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          disabled={location.isFinished === 1}
                        >
                          <Trash size={24} />
                        </button>
                      </div>
                    </div>

                    {expandedIndex === index && (
                      <>
                        {location.workHours && location.workHours.length > 0 ? (
                          <ul className="mt-3 space-y-1 text-sm text-gray-700">
                            {location.workHours.map((wh) => (
                              <li
                                key={wh.id}
                                className="flex justify-between items-center border-b border-gray-200 pb-1"
                              >
                                <span>
                                  {wh.hours}h -{" "}
                                  {new Date(wh.date).toLocaleDateString(
                                    "pt-BR"
                                  )}
                                </span>
                                <button
                                  onClick={() => {
                                    if (location.isFinished) {
                                      toast.error(
                                        "Localização finalizada não pode ser alterada."
                                      );
                                      return;
                                    }
                                    handleDeleteWorkHour(wh.id!);
                                  }}
                                  className={`${
                                    location.isFinished
                                      ? "text-gray-400 cursor-not-allowed"
                                      : "text-red-600 hover:text-red-800"
                                  }`}
                                  disabled={location.isFinished === 1}
                                >
                                  <Trash size={16} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500 mt-2">
                            Sem registros de horas.
                          </p>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
      <DeleteLocationDialog
        location={locationToDelete}
        onCancel={() => setLocationToDelete(null)}
        onConfirm={async () => {
          if (locationToDelete) {
            await handleDeleteLocation(locationToDelete.id);
            setLocationToDelete(null);
          }
        }}
      />
      <LocationDialog
        open={openLocationDialog}
        onClose={() => setOpenLocationDialog(false)}
        onSave={handleSaveLocation}
      />
    </Layout>
  );
}
